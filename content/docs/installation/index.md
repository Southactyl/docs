---
title: Installation
description: Install the Southactyl panel on a Linux server.
navigation:
  icon: i-lucide-server
seo:
  title: Southactyl Installation
  description: Step-by-step guide to install the Southactyl panel.
---

# Installation

Install Southactyl using the same base workflow as Pterodactyl Panel v1, adapted for the Southactyl

This guide installs the **panel only**. Wings or node setup belongs in a separate guide.

## Installation sections

Follow these files in order:

1. [Getting Started](/docs/getting-started)
2. [Requirements](/docs/installation/02-requirements)
3. [Install dependencies](/docs/installation/03-install-dependencies)
4. [Download Southactyl](/docs/installation/04-download-southactyl)
5. [Create the database](/docs/installation/05-database)
6. [Configure the application](/docs/installation/06-application-config)
7. [Run migrations and create an admin](/docs/installation/07-migrations-admin)
8. [Set permissions](/docs/installation/08-permissions)
9. [Configure scheduler and queue worker](/docs/installation/09-scheduler-queue)
10. [Configure HTTPS and NGINX](/docs/installation/10-nginx-https)
11. [Verify and troubleshoot](/docs/installation/11-verify-troubleshoot)

## Placeholders used in these docs

Replace these before running commands:

| Placeholder           | Replace with                          |
| --------------------- | ------------------------------------- |
| `panel.example.com`   | Your Southactyl panel domain          |
| `change_me_securely`  | A strong database password            |
| `/var/www/southactyl` | Your panel install path, if different |

## Target stack used in the examples

These docs use:

- Ubuntu
- NGINX
- PHP `8.3`
- MariaDB
- Redis
- Composer v2

Other Linux distributions work, but package names, service names, and web server users may differ.
