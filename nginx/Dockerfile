FROM nginx:alpine as nginx-proxy

COPY default.conf /etc/nginx/conf.d/default.conf

# ## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

# COPY dist/angular-app /usr/share/nginx/html
