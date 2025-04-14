# Используем официальный PHP-образ с поддержкой FPM
FROM php:8.2-fpm

# Устанавливаем необходимые зависимости и PHP-расширения
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo \
        pdo_pgsql \
        pdo_mysql \
        mbstring \
        zip \
        exif \
        pcntl \
        gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Установка рабочей директории
WORKDIR /var/www/

# Установка зависимостей Laravel
#RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Кэширование конфигурации Laravel
#RUN php artisan config:cache || true

# Установка прав на storage и bootstrap/cache
#RUN chown -R www-data:www-data /var/www/ \
#    && chmod -R 755 /var/www/storage \
#    && chmod -R 755 /var/www/bootstrap/cache

# Открываем порт для php-fpm
EXPOSE 9000

# Запускаем php-fpm
CMD ["php-fpm"]
