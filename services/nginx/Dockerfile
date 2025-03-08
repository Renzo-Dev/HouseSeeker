FROM nginx:1.25-alpine

# Установка минимальных зависимостей и очистка
RUN apk update && apk add --no-cache \
    bash \
    && rm -rf /var/cache/apk/*

# Удаление дефолтной конфигурации
RUN rm /etc/nginx/conf.d/default.conf

# Копирование кастомной конфигурации
#COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /var/www/html/public

# Проверка синтаксиса конфигурации при сборке
RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]