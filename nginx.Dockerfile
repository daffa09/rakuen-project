FROM nginx:alpine

WORKDIR /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
