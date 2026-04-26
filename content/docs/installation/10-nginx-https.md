---
title: NGINX and HTTPS
description: Configure TLS and NGINX for the Southactyl panel.
navigation:
  icon: i-lucide-shield-check
seo:
  title: Southactyl NGINX and HTTPS
  description: Configure Certbot, Let's Encrypt, TLS, and NGINX for Southactyl.
---

# NGINX and HTTPS

This example uses NGINX with Let's Encrypt.

## Install Certbot

```bash [Terminal]
apt update
apt -y install certbot python3-certbot-nginx
```

## Request a certificate

```bash [Terminal]
certbot certonly --nginx -d panel.example.com
```

Your domain must point to the server, and port `80` must be reachable.

> Do not enable the SSL NGINX config before the certificate exists. NGINX will fail to start if the certificate paths are missing.

## Remove the default NGINX site

```bash [Terminal]
rm -f /etc/nginx/sites-enabled/default
```

## Create the Southactyl NGINX config

```bash [Terminal]
nano /etc/nginx/sites-available/southactyl.conf
```

Paste this config and replace `panel.example.com`:

```nginx [/etc/nginx/sites-available/southactyl.conf]
server {
    listen 80;
    server_name panel.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name panel.example.com;

    root /var/www/southactyl/public;
    index index.php;

    access_log /var/log/nginx/southactyl-access.log;
    error_log  /var/log/nginx/southactyl-error.log error;

    client_max_body_size 100m;
    client_body_timeout 120s;

    sendfile off;

    ssl_certificate /etc/letsencrypt/live/panel.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/panel.example.com/privkey.pem;
    ssl_session_cache shared:SSL:10m;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Robots-Tag none;
    add_header Content-Security-Policy "frame-ancestors 'self'";
    add_header X-Frame-Options DENY;
    add_header Referrer-Policy same-origin;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;

        fastcgi_param PHP_VALUE "upload_max_filesize = 100M \n post_max_size=100M";
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param HTTP_PROXY "";

        fastcgi_intercept_errors off;
        fastcgi_buffer_size 16k;
        fastcgi_buffers 4 16k;
        fastcgi_connect_timeout 300;
        fastcgi_send_timeout 300;
        fastcgi_read_timeout 300;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

## Enable the site

```bash [Terminal]
ln -s /etc/nginx/sites-available/southactyl.conf /etc/nginx/sites-enabled/southactyl.conf
nginx -t
systemctl restart nginx
```

## PHP 8.2 socket

If you installed PHP `8.2`, change this line:

```nginx
fastcgi_pass unix:/run/php/php8.3-fpm.sock;
```

to:

```nginx
fastcgi_pass unix:/run/php/php8.2-fpm.sock;
```
