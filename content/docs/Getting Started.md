---
title: Getting Started
description: Prepare your server before installing Southactyl.
navigation:
  icon: i-lucide-alert-triangle
seo:
  title: Getting Started
  description: Prepare your server before installing the Southactyl panel.
---

# **Getting Started**

Use a fresh Linux server. Existing web stacks, old PHP versions, random control panels, or half-configured databases can conflict with the panel install.

Southactyl is not a drag-and-drop app. Blindly pasting commands without understanding them is how you create support tickets nobody wants to debug.

## You need

- Root or sudo access
- A domain or subdomain pointed to the server
- Ports `80` and `443` open
- A supported Linux distribution
- Basic Linux administration knowledge

## DNS

Create an `A` record pointing your panel domain to the server IP:

```text [DNS]
panel.example.com -> 203.0.113.10
```

Wait for DNS to resolve before requesting an SSL certificate.

## Firewall

At minimum, allow SSH, HTTP, and HTTPS:

```bash [Terminal]
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
ufw status
```

If you use another firewall, apply the equivalent rules.
