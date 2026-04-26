---
title: Requirements
description: Operating system and software requirements for Southactyl.
navigation:
  icon: i-lucide-list-checks
seo:
  title: Southactyl Requirements
  description: Required operating system, PHP extensions, database, Redis, and web server packages.
---

# Requirements

## Supported operating systems

Recommended targets:

| OS                  | Version          | Notes                                                   |
| ------------------- | ---------------- | ------------------------------------------------------- |
| Ubuntu              | `22.04`, `24.04` | Ubuntu `22.04` usually needs an external PHP repository |
| Debian              | `11`, `12`, `13` | Debian may require Sury PHP packages                    |
| Rocky / Alma / RHEL | `8`, `9`         | Package names, users, and Redis service names differ    |

The command examples in this documentation target **Ubuntu**.

## Required software

Southactyl needs:

- PHP `8.2` or `8.3`
- MySQL `8+` or MariaDB `10.2+`
- Redis
- Composer v2
- Web server:
  - NGINX
  - Apache
  - Caddy
- `curl`
- `tar`
- `unzip`
- `git`

## PHP extensions

Install these PHP extensions:

- `cli`
- `openssl`
- `gd`
- `mysql`
- `pdo`
- `mbstring`
- `tokenizer`
- `bcmath`
- `xml` / `dom`
- `curl`
- `zip`
- `fpm`

## Recommended production assumptions

Use:

- HTTPS only
- Redis for cache, sessions, and queue
- A local database bound to `127.0.0.1`
- A dedicated database user
- A backed-up `.env` file
- A backed-up `APP_KEY`

Losing `APP_KEY` is not a small mistake. Encrypted data such as API keys may become unrecoverable.
