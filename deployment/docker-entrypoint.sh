#!/bin/sh
set -e

# Copy env jika belum ada
if [ ! -f /var/www/.env ]; then
    cp /var/www/.env.docker /var/www/.env
fi

# Tunggu DB siap
echo "Waiting for MySQL..."
dockerize -wait tcp://$DB_HOST:$DB_PORT -timeout 60s
echo "MySQL ready!"

# Generate APP_KEY jika belum ada
php artisan key:generate --force

# Jalankan migrate
php artisan migrate --force

# Jalankan PHP-FPM
php-fpm
