# Stage 1: Build frontend
FROM node:22-alpine AS node-build
WORKDIR /app

# Copy package files dan install dependency
COPY package*.json ./
RUN npm install

# Copy seluruh source frontend dan build
COPY . .
RUN npm run build

# Stage 2: PHP
FROM php:8.3-fpm

# Install dependencies OS + PHP extensions + MariaDB client
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client-compat wget \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install dockerize (untuk wait-for tcp)
RUN wget https://github.com/jwilder/dockerize/releases/download/v0.7.0/dockerize-linux-amd64-v0.7.0.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-v0.7.0.tar.gz \
    && rm dockerize-linux-amd64-v0.7.0.tar.gz

# Install Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www
COPY . .
COPY --from=node-build /app/public/build /var/www/public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permission
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Set permission Laravel
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public \
    && chmod -R 755 /var/www/public /var/www/public/build

# Copy entrypoint
COPY ./deployment/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
