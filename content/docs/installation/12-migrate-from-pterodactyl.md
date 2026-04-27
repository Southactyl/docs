---
title: Migrate from Pterodactyl
description: Convert an existing Pterodactyl Panel v1 install into Southactyl safely.
navigation:
  icon: i-lucide-git-compare-arrows
seo:
  title: Migrate from Pterodactyl to Southactyl
  description: Back up an existing Pterodactyl panel, apply Southactyl files, rebuild assets, run migrations, and verify the migration.
---

# Migrate from Pterodactyl

Use this guide when you already have a working **Pterodactyl Panel v1** install and want to move it to Southactyl.

This is not a fresh install. Do not create a new database, do not generate a new `APP_KEY`, and do not blindly overwrite `.env`. That would be a stupid way to turn a migration into data loss.

## What this migration keeps

A normal migration keeps your existing:

- Users
- Servers
- Nodes
- Allocations
- Eggs and nests
- API keys
- Database records
- Mail settings
- Panel URL settings
- Existing `.env`
- Existing `APP_KEY`

## What this migration replaces

The migration replaces or updates panel application files, such as:

- Application source files
- Routes
- Views
- Config files
- Public assets
- Frontend build output
- Composer and frontend dependencies

## Before you start

You need:

- A working Pterodactyl Panel v1 install
- SSH root or sudo access
- Access to the panel database
- The Southactyl release archive
- Enough disk space for a full backup
- A maintenance window

Do this on a staging copy first if the panel matters. Testing on production first is not confidence; it is gambling.

## Placeholders used in this guide

Replace these values before running commands:

| Placeholder                                                                      | Replace with                        |
| -------------------------------------------------------------------------------- | ----------------------------------- |
| `/var/www/pterodactyl`                                                           | Your current Pterodactyl panel path |
| `pterodactyl`                                                                    | Your current database name          |
| `panel.example.com`                                                              | Your panel domain                   |
| `https://github.com/southactyl/southactyl/releases/latest/download/panel.tar.gz` | Your real Southactyl release URL    |

## 1) Enter the panel directory

```bash [Terminal]
cd /var/www/pterodactyl
```

Confirm this is the right directory:

```bash [Terminal]
ls -lah artisan .env composer.json
```

If `artisan` or `.env` is missing, you are in the wrong directory. Stop.

## 2) Check the current panel

Run basic checks before touching anything:

```bash [Terminal]
php artisan --version
php artisan about
php -v
composer --version
```

Check the current services:

```bash [Terminal]
systemctl status nginx || systemctl status apache2
systemctl status php8.3-fpm || systemctl status php8.2-fpm
systemctl status redis-server
systemctl status pteroq || true
```

If the existing panel is already broken, fix that first. Migrating a broken panel usually gives you a broken Southactyl panel with extra mystery.

## 3) Put the panel in maintenance mode

```bash [Terminal]
php artisan down
```

Stop the current queue worker:

```bash [Terminal]
systemctl stop pteroq || true
systemctl stop southactyl-queue || true
```

Your queue service may use a different name. If it does, stop that service instead.

## 4) Create a full backup

Create a backup directory:

```bash [Terminal]
BACKUP_DIR="/root/panel-backups/$(date +%F-%H%M%S)"
mkdir -p "$BACKUP_DIR"
```

Back up the panel files:

```bash [Terminal]
tar -czf "$BACKUP_DIR/panel-files.tar.gz" -C /var/www pterodactyl
```

Back up `.env` separately:

```bash [Terminal]
cp /var/www/pterodactyl/.env "$BACKUP_DIR/.env"
```

Back up the database:

```bash [Terminal]
mysqldump -u root -p --single-transaction pterodactyl > "$BACKUP_DIR/database.sql"
```

If your database is not named `pterodactyl`, use the value from `.env`:

```bash [Terminal]
grep '^DB_DATABASE=' /var/www/pterodactyl/.env
```

Back up the application key:

```bash [Terminal]
grep '^APP_KEY=' /var/www/pterodactyl/.env > "$BACKUP_DIR/APP_KEY.txt"
cat "$BACKUP_DIR/APP_KEY.txt"
```

Save that key somewhere secure. Losing `APP_KEY` can make encrypted data unrecoverable.

## 5) Download Southactyl to a temporary directory

Do not extract the archive directly on top of your live panel. That is sloppy.

```bash [Terminal]
mkdir -p /tmp/southactyl-migration
cd /tmp/southactyl-migration
curl -Lo panel.tar.gz https://github.com/southactyl/southactyl/releases/latest/download/panel.tar.gz
tar -xzvf panel.tar.gz
```

Check the extracted files:

```bash [Terminal]
ls -lah
```

You should see files such as:

```text [Output]
artisan
app
bootstrap
config
database
public
resources
routes
storage
composer.json
```

If `artisan` is missing, you downloaded the wrong archive or extracted it wrong.

## 6) Overlay Southactyl files onto Pterodactyl

Return to the temporary release directory:

```bash [Terminal]
cd /tmp/southactyl-migration
```

Copy Southactyl over the existing panel while preserving critical local data:

```bash [Terminal]
rsync -a --delete \
  --exclude='.env' \
  --exclude='storage/app' \
  --exclude='storage/logs' \
  --exclude='storage/framework/cache/*' \
  --exclude='storage/framework/sessions/*' \
  --exclude='storage/framework/views/*' \
  --exclude='node_modules' \
  --exclude='vendor' \
  ./ /var/www/pterodactyl/
```

This keeps your `.env`, uploaded application storage, and logs while replacing the panel code.

## 7) Install backend dependencies

```bash [Terminal]
cd /var/www/pterodactyl
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader
```

If Composer fails, do not keep going. Fix the dependency error first.

## 8) Install frontend dependencies and build assets

Use the package manager your release provides.

If the release has `yarn.lock`:

```bash [Terminal]
corepack enable
yarn install --frozen-lockfile
yarn build:production
```

If the release has `package-lock.json`:

```bash [Terminal]
npm ci
npm run build
```

If Southactyl ships prebuilt assets and has no frontend build step, skip this section.

## 9) Update environment values only if needed

Do not generate a new key.

Bad command during migration:

```bash [Terminal]
php artisan key:generate --force
```

Do not run that. It can invalidate encrypted data.

Only update `.env` if your domain or driver settings changed:

```bash [Terminal]
nano /var/www/pterodactyl/.env
```

Recommended values:

```env [.env]
APP_URL=https://panel.example.com
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

Some older installs may use `QUEUE_DRIVER` instead of `QUEUE_CONNECTION`. Use whatever your codebase expects.

## 10) Run migrations

Run migrations against the existing database:

```bash [Terminal]
cd /var/www/pterodactyl
php artisan migrate --force
```

Do not run `migrate:fresh`. That destroys tables.

Do not create a new admin user unless you actually need one. Your existing admin users should remain.

## 11) Clear and rebuild caches

```bash [Terminal]
php artisan optimize:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear
```

Then rebuild optimized caches:

```bash [Terminal]
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

If one cache command fails because of a route or config issue, fix the error before continuing.

## 12) Fix ownership and permissions

For Debian or Ubuntu:

```bash [Terminal]
chown -R www-data:www-data /var/www/pterodactyl/*
chmod -R 755 /var/www/pterodactyl/storage/* /var/www/pterodactyl/bootstrap/cache/
```

For Rocky, AlmaLinux, or RHEL with NGINX:

```bash [Terminal]
chown -R nginx:nginx /var/www/pterodactyl/*
chmod -R 755 /var/www/pterodactyl/storage/* /var/www/pterodactyl/bootstrap/cache/
```

For Rocky, AlmaLinux, or RHEL with Apache:

```bash [Terminal]
chown -R apache:apache /var/www/pterodactyl/*
chmod -R 755 /var/www/pterodactyl/storage/* /var/www/pterodactyl/bootstrap/cache/
```

## 13) Update the queue worker name if wanted

If your existing `pteroq` service works and points to the correct `artisan` path, you can keep it.

If you want a Southactyl-branded service, create this file:

```bash [Terminal]
nano /etc/systemd/system/southactyl-queue.service
```

Paste:

```ini [/etc/systemd/system/southactyl-queue.service]
[Unit]
Description=Southactyl Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Adjust `User`, `Group`, and Redis service name for your operating system.

Enable it:

```bash [Terminal]
systemctl daemon-reload
systemctl disable --now pteroq || true
systemctl enable --now southactyl-queue.service
```

## 14) Restart services

For PHP `8.3` with NGINX:

```bash [Terminal]
systemctl restart php8.3-fpm
systemctl restart redis-server
systemctl restart nginx
systemctl restart southactyl-queue.service || systemctl restart pteroq
```

For PHP `8.2`, replace `php8.3-fpm` with `php8.2-fpm`.

## 15) Bring the panel back online

```bash [Terminal]
cd /var/www/pterodactyl
php artisan up
```

Open the panel in your browser and log in with an existing admin account.

## 16) Verify the migration

Run:

```bash [Terminal]
php artisan about
systemctl status redis-server
systemctl status nginx
systemctl status southactyl-queue.service || systemctl status pteroq
```

Check these in the panel:

- Login works
- Admin area loads
- Server list loads
- Node list loads
- Console pages load
- CSS and JavaScript assets load
- Addons still appear if installed
- Creating or editing a server does not error
- Queue jobs process correctly

Check logs:

```bash [Terminal]
tail -n 100 /var/www/pterodactyl/storage/logs/laravel-*.log
journalctl -u southactyl-queue.service -n 100 --no-pager || journalctl -u pteroq -n 100 --no-pager
tail -n 100 /var/log/nginx/error.log
```

## Roll back if the migration fails

Stop services:

```bash [Terminal]
systemctl stop southactyl-queue.service || true
systemctl stop pteroq || true
systemctl stop nginx || true
```

Restore files:

```bash [Terminal]
rm -rf /var/www/pterodactyl
mkdir -p /var/www
tar -xzf "$BACKUP_DIR/panel-files.tar.gz" -C /var/www
```

Restore the database:

```bash [Terminal]
mysql -u root -p pterodactyl < "$BACKUP_DIR/database.sql"
```

Restore ownership:

```bash [Terminal]
chown -R www-data:www-data /var/www/pterodactyl/*
```

Restart services:

```bash [Terminal]
systemctl start nginx
systemctl start pteroq || systemctl start southactyl-queue.service
```

Bring the panel online:

```bash [Terminal]
cd /var/www/pterodactyl
php artisan up
```

If rollback fails too, your backup process was trash. Fix that before attempting the migration again.

## Common migration problems

| Problem                     | Likely cause                                               | Fix                                               |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------------- |
| White screen or `500` error | Bad permissions, broken `.env`, or failed Composer install | Check Laravel logs and rerun Composer             |
| Assets look broken          | Frontend assets were not built or old cache is still used  | Rebuild assets and clear caches                   |
| Login fails after migration | Session/cache driver changed or Redis is broken            | Check `.env`, Redis, and Laravel logs             |
| Queue jobs do not run       | Queue worker still points to the wrong path or is stopped  | Check systemd service and restart it              |
| Database error              | Wrong `.env` database values or failed migration           | Restore `.env` or fix database credentials        |
| Addon pages fail            | Addon not compatible with Southactyl files                 | Disable the addon or install a compatible version |
| `APP_KEY` errors            | A new key was generated or `.env` was overwritten          | Restore `.env` from backup immediately            |

## Final cleanup

After everything works:

```bash [Terminal]
rm -rf /tmp/southactyl-migration
```

Keep your backup until you have confirmed the panel works under real usage. Deleting the only rollback point five minutes after migration is how amateurs suffer.
