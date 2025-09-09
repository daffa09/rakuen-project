#!/bin/sh
set -e

# Copy env kalau belum ada
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.docker /var/www/.env
fi

# Tunggu MySQL siap (disable SSL)
echo "Waiting for MySQL to be ready..."
until mysql -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" --ssl-mode=DISABLED -e "SELECT 1;" > /dev/null 2>&1; do
  echo "MySQL not ready yet..."
  sleep 2
done
echo "MySQL is ready!"

# Generate key
php artisan key:generate --force

# Migrate
php artisan migrate --force

# Jalankan PHP-FPM
php-fpm
