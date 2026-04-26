---
title: Install Dependencies
description: Install PHP, MariaDB, NGINX, Redis, Composer, and required packages.
navigation:
  icon: i-lucide-package
seo:
  title: Install Southactyl Dependencies
  description: Install system packages required by the Southactyl panel.
---

# Install dependencies

These commands are for Ubuntu.

## Update the server

```bash [Terminal]
apt update
apt -y upgrade
```

## Install base packages

```bash [Terminal]
apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg lsb-release sudo
```

## Add the PHP repository

```bash [Terminal]
LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
```

## Add the Redis repository

```bash [Terminal]
curl -fsSL https://packages.redis.io/gpg | gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" \
  | tee /etc/apt/sources.list.d/redis.list
```

## Install packages

```bash [Terminal]
apt update

apt -y install \
  php8.3 php8.3-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} \
  mariadb-server nginx tar unzip git redis-server
```

## Enable Redis

```bash [Terminal]
systemctl enable --now redis-server
systemctl status redis-server
```

## Install Composer

```bash [Terminal]
curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
composer --version
```

## PHP 8.2 note

If you use PHP `8.2`, replace every `php8.3` package and socket path with `php8.2`.

For example:

```bash [Terminal]
apt -y install php8.2 php8.2-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip}
```
