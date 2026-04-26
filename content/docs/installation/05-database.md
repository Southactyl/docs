---
title: Create the Database
description: Create the Southactyl database and database user.
navigation:
  icon: i-lucide-database
seo:
  title: Create the Southactyl Database
  description: Set up MariaDB or MySQL for Southactyl.
---

# Create the database

## Open the database shell

For MariaDB:

```bash [Terminal]
mariadb -u root -p
```

For MySQL:

```bash [Terminal]
mysql -u root -p
```

## Create the database and user

```sql [SQL]
CREATE USER 'southactyl'@'127.0.0.1' IDENTIFIED BY 'change_me_securely';
CREATE DATABASE southactyl;
GRANT ALL PRIVILEGES ON southactyl.* TO 'southactyl'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
EXIT;
```

Use a real password. `change_me_securely` is a placeholder, not a challenge to get hacked.

## Test the database login

```bash [Terminal]
mysql -u southactyl -p -h 127.0.0.1 southactyl
```

Exit after the login succeeds:

```sql [SQL]
EXIT;
```

If login fails, fix the database credentials before continuing. Do not keep installing on top of a broken database setup.
