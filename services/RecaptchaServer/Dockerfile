# Используем легковесный образ Node.js на Alpine
FROM node:20-alpine

# Обновляем систему и устанавливаем mc
RUN apk update && apk upgrade && apk add --no-cache mc

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
#COPY package*.json ./

# Устанавливаем зависимости
#RUN npm install --only=production

# Копируем исходный код приложения
#COPY . .

# Открываем порт (например, 3000)
EXPOSE 3000

# Запускаем приложение
CMD ["node", "server.js"]
