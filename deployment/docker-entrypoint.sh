#!/bin/sh
set -e

# Copy env khusus docker kalau .env belum ada
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.docker /var/www/.env
fi

# Tunggu MySQL siap pakai dockerize
echo "Waiting for MySQL to be ready..."
dockerize -wait tcp://$DB_HOST:$DB_PORT -timeout 60s
echo "MySQL is ready!"

# Generate APP_KEY jika belum ada
php artisan key:generate --force

# Jalankan migrate otomatis
php artisan migrate --force

# Jalankan PHP-FPM
php-fpm
