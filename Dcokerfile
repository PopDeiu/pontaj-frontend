FROM nginx:alpine

# Copy site
COPY static/ /usr/share/nginx/html/
COPY entrypoint.sh /entrypoint.sh

# Nginx config (adds basic no-cache + serves SPA-ish)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]