#!/bin/sh
set -e

# Copy env khusus docker kalau .env belum ada
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.docker /var/www/.env
fi

# Generate APP_KEY kalau belum ada
php artisan key:generate --force

# Jalankan migrate otomatis
php artisan migrate --force

# Jalankan PHP-FPM
php-fpm
