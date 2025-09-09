# ===========================
# Stage 1: Build Frontend React/Vite
# ===========================
FROM node:22-alpine AS node-build
WORKDIR /app

# Copy package files + vite config + index.html
COPY package*.json vite.config.js index.html ./

# Install dependencies
RUN npm install

# Copy seluruh source frontend (misal resources/js)
COPY resources/js ./resources/js
COPY resources/css ./resources/css

# Build production
RUN npm run build

# ===========================
# Stage 2: PHP-FPM Laravel
# ===========================
FROM php:8.3-fpm

# Install OS deps + PHP extensions + MariaDB client
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client-compat wget \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www

# Copy seluruh project Laravel
COPY . .

# Copy hasil build React dari stage 1
COPY --from=node-build /app/dist /var/www/public/build  # pastikan output Vite sesuai config

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions storage & cache
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Copy entrypoint
COPY ./deployment/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
