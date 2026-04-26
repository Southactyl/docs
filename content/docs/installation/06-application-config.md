---
title: Configure the Application
description: Configure Southactyl environment settings and install Composer dependencies.
navigation:
  icon: i-lucide-settings
seo:
  title: Configure Southactyl
  description: Configure the environment, application key, database, mail, cache, sessions, and queue settings.
---

# Configure the application

## Copy the environment file

```bash [Terminal]
cd /var/www/southactyl
cp .env.example .env
```

## Install PHP dependencies

```bash [Terminal]
COMPOSER_ALLOW_SUPERUSER=1 composer install --no-dev --optimize-autoloader
```

## Generate the application key

```bash [Terminal]
php artisan key:generate --force
```

## Back up the application key

Print the key:

```bash [Terminal]
grep APP_KEY /var/www/southactyl/.env
```

Save the full `APP_KEY=base64:...` line somewhere secure, such as a password manager.

> **Critical:** If you lose the `APP_KEY`, encrypted data such as API keys cannot be recovered. A database backup without the matching `APP_KEY` may be useless.

## Run environment setup

```bash [Terminal]
php artisan p:environment:setup
php artisan p:environment:database
php artisan p:environment:mail
```

Recommended values:

| Prompt            | Recommended value           |
| ----------------- | --------------------------- |
| Application URL   | `https://panel.example.com` |
| Cache driver      | `redis`                     |
| Session driver    | `redis`                     |
| Queue driver      | `redis`                     |
| Database host     | `127.0.0.1`                 |
| Database name     | `southactyl`                |
| Database username | `southactyl`                |
| Database password | Your database password      |

If Southactyl renamed the artisan commands, use the Southactyl equivalents.

## Optional: disable inherited Pterodactyl telemetry

If Southactyl still includes Pterodactyl telemetry and you do not want it enabled, add or update this in `.env`:

```env [.env]
PTERODACTYL_TELEMETRY_ENABLED=false
```

Then clear the config cache:

```bash [Terminal]
php artisan config:clear
php artisan cache:clear
```

If Southactyl removed or renamed telemetry, ignore this section.
