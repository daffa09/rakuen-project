#!/bin/sh
set -e

# Copy env khusus docker kalau .env belum ada
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.docker /var/www/.env
fi

# Tunggu MySQL siap
echo "Waiting for MySQL to be ready..."
until mysql -h"$DB_HOST" -u"$DB_USERNAME" -p"$DB_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1; do
  echo "MySQL not ready yet..."
  sleep 2
done
echo "MySQL is ready!"

# Install composer dependencies kalau vendor/ kosong
if [ ! -d /var/www/vendor ]; then
    composer install --no-dev --optimize-autoloader
fi

# Generate APP_KEY kalau belum ada
php artisan key:generate --force

# Jalankan migrate otomatis
php artisan migrate --force

# Jalankan PHP-FPM
php-fpm
