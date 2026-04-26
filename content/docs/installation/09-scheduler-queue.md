---
title: Scheduler and Queue Worker
description: Configure cron and systemd queue worker for Southactyl.
navigation:
  icon: i-lucide-timer
seo:
  title: Southactyl Scheduler and Queue Worker
  description: Configure the Laravel scheduler and queue worker for Southactyl.
---

# Scheduler and queue worker

Southactyl relies on scheduled tasks and queue workers. Skipping these is how you get a panel that looks installed but behaves broken.

## Configure the scheduler

Open root's crontab:

```bash [Terminal]
crontab -e
```

Add this line:

```cron [Cron]
* * * * * php /var/www/southactyl/artisan schedule:run >> /dev/null 2>&1
```

## Configure the queue worker

Create the service file:

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
ExecStart=/usr/bin/php /var/www/southactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

For Rocky, AlmaLinux, or RHEL, Redis may use `redis.service` instead:

```ini
After=redis.service
```

Also change `User` and `Group` if your web server user is not `www-data`.

## Enable the queue worker

```bash [Terminal]
systemctl daemon-reload
systemctl enable --now southactyl-queue.service
systemctl status southactyl-queue.service
```

## View queue logs

```bash [Terminal]
journalctl -u southactyl-queue.service -n 100 --no-pager
```
