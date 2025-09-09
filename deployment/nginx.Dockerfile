FROM nginx:alpine

COPY ./deployment/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www
