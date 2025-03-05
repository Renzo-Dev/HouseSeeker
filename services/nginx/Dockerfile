# Используем официальный образ Nginx
FROM nginx:latest

# Копируем конфигурацию Nginx в контейнер
#COPY ./nginx.conf /etc/nginx/nginx.conf

# Копируем публичную директорию Laravel в Nginx
#COPY ./public /var/www/html

# Указываем рабочую директорию для Nginx
WORKDIR /var/www/html

# Открываем порты 80 и 443 (если нужен HTTPS)
EXPOSE 80
#EXPOSE 443

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
