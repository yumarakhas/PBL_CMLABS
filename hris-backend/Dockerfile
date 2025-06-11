FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    git \
    unzip \
    curl \
    libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql pgsql zip

WORKDIR /var/www

COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN cp .env.example .env && \
    php artisan key:generate && \
    php artisan storage:link

RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

RUN chown -R www-data:www-data /var/www

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]