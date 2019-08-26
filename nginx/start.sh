#!/bin/sh

echo "setting nginx conf ..."
echo "API_PLACEHOLDER": $API_PLACEHOLDER
echo "UPLOADS_PLACEHOLDER": $UPLOADS_PLACEHOLDER
echo "BACKEND_GATEWAY": $BACKEND_GATEWAY
echo "ONEC_GATEWAY": $ONEC_GATEWAY
echo "API_ONEC_PLACEHOLDER": $API_ONEC_PLACEHOLDER

# replace env for nginx conf
envsubst '$API_PLACEHOLDER $UPLOADS_PLACEHOLDER $BACKEND_GATEWAY $ONEC_GATEWAY $API_ONEC_PLACEHOLDER' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# start nginx
nginx -g 'daemon off;'
exec "$@"