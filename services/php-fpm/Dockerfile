FROM php:8.2-fpm-alpine

# Установка зависимостей
RUN apk update && apk add --no-cache \
    bash \
    libpq-dev \
    unzip \
    curl \
    git \
    mc \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        opcache \
    && rm -rf /var/cache/apk/*

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer require predis/predis

# Рабочая директория
WORKDIR /var/www/html

# Копирование кода приложения
#COPY ./src /var/www/html

# Установка зависимостей Laravel
#RUN composer install --optimize-autoloader --no-dev

# Настройка прав доступа
#RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# Копирование кастомного php.ini
#COPY php.ini /usr/local/etc/php/conf.d/custom.ini

# Оптимизация Laravel
#RUN php artisan config:cache \
#    && php artisan route:cache \
#    && php artisan view:cache

EXPOSE 9000

CMD ["php-fpm"]