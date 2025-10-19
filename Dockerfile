# ===========================
# Stage 2: PHP + Nginx
# ===========================
FROM php:8.3-fpm

# Install OS dependencies + PHP extensions + MariaDB client + Nginx + netcat
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libonig-dev libxml2-dev zip unzip mariadb-client wget nginx netcat-openbsd \
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

# Set permissions
RUN chown -R www-data:www-data /var/www/public /var/www/storage /var/www/bootstrap/cache \
    && chmod -R 755 /var/www/public /var/www/storage /var/www/bootstrap/cache

# Disable default Nginx sites
RUN rm -f /etc/nginx/sites-enabled/default /etc/nginx/conf.d/default.conf.default 2>/dev/null || true

# Copy nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint
COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 80

# Start entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]
