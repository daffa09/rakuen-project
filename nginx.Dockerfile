FROM nginx:alpine

WORKDIR /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R nginx:nginx /var/www/public/build \
    && chmod -R 755 /var/www/public/build
