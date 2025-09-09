#!/bin/sh
set -e

# Tunggu MySQL siap
while ! nc -z $DB_HOST $DB_PORT; do
  echo "Waiting for MySQL..."
  sleep 2
done

echo "MySQL is ready!"

# Generate APP_KEY jika belum ada
php artisan key:generate --force

# Jalankan migrate otomatis
php artisan migrate --force

# Jalankan PHP-FPM dan Nginx
php-fpm
nginx -g "daemon off;"
