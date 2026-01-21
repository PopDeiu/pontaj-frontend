#!/bin/sh
set -e

: "${DEFAULT_BACKEND:=/api/scan}"

envsubst '$DEFAULT_BACKEND' \
  < /usr/share/nginx/html/env.js \
  > /usr/share/nginx/html/env.js.tmp

mv /usr/share/nginx/html/env.js.tmp /usr/share/nginx/html/env.js

exec nginx -g 'daemon off;'
