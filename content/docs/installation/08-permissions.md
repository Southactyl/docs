---
title: File Permissions
description: Set correct ownership for the Southactyl panel files.
navigation:
  icon: i-lucide-lock-keyhole
seo:
  title: Southactyl File Permissions
  description: Configure file ownership for Debian, Ubuntu, Rocky, AlmaLinux, and RHEL.
---

# File permissions

The web server user must own the panel files.

## Debian or Ubuntu

For NGINX, Apache, or Caddy:

```bash [Terminal]
chown -R www-data:www-data /var/www/southactyl/*
```

## Rocky, AlmaLinux, or RHEL with NGINX

```bash [Terminal]
chown -R nginx:nginx /var/www/southactyl/*
```

## Rocky, AlmaLinux, or RHEL with Apache

```bash [Terminal]
chown -R apache:apache /var/www/southactyl/*
```

## Verify ownership

```bash [Terminal]
ls -lah /var/www/southactyl
ls -lah /var/www/southactyl/storage
```

If the panel shows a blank page or `500` error later, bad permissions are one of the first things to check.
