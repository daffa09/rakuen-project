# Stage 1: Build frontend
FROM node:22-alpine AS node-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: PHP
FROM php:8.3-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mysql-client \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

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

# Copy entrypoint
COPY ./deployment/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]
