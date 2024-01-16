FROM yiisoftware/yii2-php:8.1-apache

RUN useradd -ms /bin/bash www

WORKDIR /app

RUN chown -R www:www /app

RUN chmod 755 /app

USER www