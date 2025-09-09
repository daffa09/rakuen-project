FROM nginx:alpine

WORKDIR /var/www
COPY ./deployment/nginx.conf /etc/nginx/conf.d/default.conf
