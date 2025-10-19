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

# Install OS dependencies + PHP extensions + MariaDB client + Nginx + netcat
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client wget nginx netcat-openbsd \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy Composer (ambil dari image composer resmi)
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Set working dir
WORKDIR /var/www

# Copy seluruh source Laravel
COPY . .

# Copy hasil build frontend dari Node stage
COPY --from=node-build /app/public/build /var/www/public/build

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set permissions
RUN chown -R www-data:www-data /var/www/public /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 755 /var/www/public /var/www/storage /var/www/bootstrap/cache

# Hapus default site Nginx
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf.default 2>/dev/null || true

# Copy nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 80 (default HTTP)
EXPOSE 80

# Jalankan entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
