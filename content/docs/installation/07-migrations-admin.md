---
title: Migrations and Admin User
description: Run Southactyl migrations and create the first administrator account.
navigation:
  icon: i-lucide-user-plus
seo:
  title: Southactyl Migrations and Admin User
  description: Run database migrations, seed data, and create the first Southactyl admin user.
---

# Migrations and admin user

## Run migrations

```bash [Terminal]
cd /var/www/southactyl
php artisan migrate --seed --force
```

Do not interrupt this command. It creates the base tables and seed data.

## Create the first administrator

```bash [Terminal]
php artisan p:user:make
```

Use a strong password. Short reused passwords are amateur-hour nonsense.

## Confirm the application can read the database

```bash [Terminal]
php artisan about
```

If the command throws a database error, fix `.env` and re-run the database environment setup:

```bash [Terminal]
php artisan p:environment:database
php artisan config:clear
```
