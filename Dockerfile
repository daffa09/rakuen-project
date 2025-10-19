# ===========================
# Stage 1: Node build frontend
# ===========================
FROM node:22-alpine AS node-build
WORKDIR /app

# Copy package.json & lockfile
COPY package*.json ./

# Install deps & build
RUN npm install
COPY . .
RUN npm run build

# ===========================
# Stage 2: PHP + Nginx
# ===========================
FROM php:8.3-fpm

# Install OS dependencies + PHP extensions + Nginx + tools
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client wget nginx netcat-openbsd \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Composer binary
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Create working directory
WORKDIR /var/www

# Copy Laravel source
COPY . .

# Copy frontend build from Node stage
COPY --from=node-build /app/public/build /var/www/public/build

# Install PHP dependencies (prod only)
RUN composer install --no-dev --optimize-autoloader

# Make sure PHP-FPM socket directory exists
RUN mkdir -p /var/run/php && chown -R www-data:www-data /var/run/php

# Permissions
RUN chown -R www-data:www-data /var/www/public /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 755 /var/www/public /var/www/storage /var/www/bootstrap/cache

# Copy Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose HTTP port
EXPOSE 80

# Start container
ENTRYPOINT ["docker-entrypoint.sh"]
