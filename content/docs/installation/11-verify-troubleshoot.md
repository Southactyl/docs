---
title: Verify and Troubleshoot
description: Verify the Southactyl install and fix common problems.
navigation:
  icon: i-lucide-stethoscope
seo:
  title: Verify and Troubleshoot Southactyl
  description: Post-install checks, logs, troubleshooting, and production security checklist.
---

# Verify and troubleshoot

## Verify installed services

Run:

```bash [Terminal]
php -v
composer --version
php artisan --version
php artisan about
systemctl status redis-server
systemctl status southactyl-queue.service
systemctl status nginx
```

Then open:

```text
https://panel.example.com
```

Sign in with the admin user created during installation.

## Check logs

Queue worker logs:

```bash [Terminal]
journalctl -u southactyl-queue.service -n 100 --no-pager
```

NGINX error logs:

```bash [Terminal]
tail -n 100 /var/log/nginx/southactyl-error.log
```

Laravel logs:

```bash [Terminal]
ls -lah /var/www/southactyl/storage/logs
tail -n 100 /var/www/southactyl/storage/logs/laravel-*.log
```

## Common problems

| Problem | Likely cause | Fix |
| --- | --- | --- |
| NGINX will not start | Missing SSL certificate | Run Certbot first or check certificate paths |
| Blank page / `500` error | Wrong permissions or bad `.env` | Check Laravel logs and run `chown` again |
| Login/session issues | Cache or session driver misconfigured | Re-run environment setup and use Redis |
| Emails do not send | Mail settings are wrong | Re-run `php artisan p:environment:mail` |
| Queue tasks never run | Queue worker not running | Check `systemctl status southactyl-queue.service` |
| Scheduled tasks never run | Cron missing | Add the scheduler cron line |
| Database connection fails | Wrong DB host/user/password | Re-run `php artisan p:environment:database` |
| PHP files download instead of execute | PHP-FPM/NGINX config broken | Check `fastcgi_pass` and PHP-FPM service |

## Security checklist

Before using the panel in production:

- Use HTTPS only
- Back up `.env`
- Back up the `APP_KEY`
- Use a strong database password
- Keep the database bound to localhost unless you know what you are doing
- Keep the server updated
- Restrict SSH access
- Enable firewall rules for only required ports
- Do not run random third-party install scripts on production servers
- Document any Southactyl-specific command or namespace changes

## Next step

After the panel works, install and configure Wings on your node server, then connect the node to Southactyl from the admin panel.
