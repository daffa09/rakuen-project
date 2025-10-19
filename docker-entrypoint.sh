#!/bin/sh
set -e

# Tunggu MySQL siap
echo "Waiting for MySQL..."
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Waiting for MySQL..."
  sleep 2
done
echo "MySQL is ready!"

# Generate APP_KEY kalau belum ada
if [ ! -f /var/www/.env ]; then
  echo "No .env file found! Make sure you mount or copy it!"
else
  php artisan key:generate --force
fi

# Jalankan migrate otomatis
php artisan migrate --force || true

# Jalankan PHP-FPM di background
php-fpm -D

# Jalankan Nginx di foreground supaya container tetap hidup
nginx -g "daemon off;"
