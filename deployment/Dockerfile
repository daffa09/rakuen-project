# -----------------------
# 1) Node builder (Vite)
# -----------------------
FROM node:22-alpine AS node-builder
WORKDIR /app

# cache dependencies
COPY package*.json vite.config.* ./
RUN npm install

# copy source & build assets
COPY . .
RUN npm run build


# -----------------------
# 2) Composer builder
# -----------------------
FROM composer:2 AS composer-builder
WORKDIR /app

# copy composer manifests
COPY composer.json composer.lock ./

# install dependencies tanpa jalanin script (supaya artisan gak dicari)
RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist --no-scripts

# sekarang copy source code (termasuk artisan)
COPY . .

# jalankan ulang dump-autoload + scripts
RUN composer dump-autoload --optimize \
    && composer run-script post-autoload-dump

# -----------------------
# 3) Final FrankenPHP image
# -----------------------
FROM dunglas/frankenphp:1-php8.3

# install PHP extensions needed by Laravel
RUN install-php-extensions \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    zip \
    gd \
    intl

WORKDIR /app

# copy source code
COPY . .

# copy vendor from composer builder
COPY --from=composer-builder /app/vendor ./vendor

# copy Vite assets
COPY --from=node-builder /app/public/build ./public/build

# set permissions for storage and cache
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# expose FrankenPHP HTTP port
EXPOSE 80
