# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
#COPY package*.json ./

# Устанавливаем зависимости
#RUN npm install --only=production

# Копируем все файлы проекта в контейнер
#COPY . .

# Указываем порт, который будет использовать контейнер
EXPOSE 3000

# Запускаем приложение
CMD ["node", "main.js"]
