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
# 3) PHP-FPM + Nginx final image
# -----------------------
FROM php:8.3-fpm-alpine AS php-nginx

# install extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    bash \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    oniguruma-dev \
    && docker-php-ext-install \
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

# copy vendor dari composer builder
COPY --from=composer-builder /app/vendor ./vendor

# copy Vite assets
COPY --from=node-builder /app/public/build ./public/build

# set permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# -----------------------
# Nginx & Supervisor setup
# -----------------------
# hapus default nginx.conf, ganti dengan custom
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
COPY ./deployment/supervisord.conf /etc/supervisord.conf

# expose port (nginx listen 80, bukan 9000 lagi)
EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]

