FROM node:23.9.0-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
#COPY src/package.json ./

# Устанавливаем зависимости
#RUN npm install --production

# Копируем исходный код приложения
#COPY . .

# Указываем порт, который будет использоваться
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "main.js"]