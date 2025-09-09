# ===========================
# Stage 1: Node build frontend
# ===========================
FROM node:22-alpine AS node-build
WORKDIR /app

# Copy package.json & package-lock.json / yarn.lock
COPY package*.json ./

# Install dependencies & build
RUN npm install
COPY . .
RUN npm run build

# ===========================
# Stage 2: PHP + Nginx
# ===========================
FROM php:8.3-fpm

# Install OS dependencies + PHP extensions + MariaDB client
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client wget \
    nginx \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www

# Copy Laravel source
COPY . .

# Copy frontend build dari Node stage
COPY --from=node-build /app/public/build /var/www/public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permission agar Nginx bisa baca
RUN chown -R www-data:www-data /var/www/public/build /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 755 /var/www/public/build /var/www/storage /var/www/bootstrap/cache

# Copy nginx config
COPY ./deployment/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint
COPY ./deployment/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 80

# Start entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
