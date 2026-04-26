---
title: Download Southactyl
description: Download and extract the Southactyl panel release archive.
navigation:
  icon: i-lucide-download
seo:
  title: Download Southactyl
  description: Create the panel directory and download Southactyl release files.
---

# Download Southactyl

## Create the panel directory

```bash [Terminal]
mkdir -p /var/www/southactyl
cd /var/www/southactyl
```

## Download the release archive

```bash [Terminal]
curl -Lo panel.tar.gz https://github.com/southactyl/southactyl/releases/latest/download/panel.tar.gz
```

## Extract the archive

```bash [Terminal]
tar -xzvf panel.tar.gz
chmod -R 755 storage/* bootstrap/cache/
```

If your release artifact is not named `panel.tar.gz`, replace the URL and filename with your actual release asset.

## Check the files

```bash [Terminal]
ls -lah
```

You should see files such as:

```text [Output]
artisan
bootstrap
config
database
public
resources
routes
storage
vendor
```

If `artisan` is missing, you extracted the wrong archive or extracted it into the wrong directory.
