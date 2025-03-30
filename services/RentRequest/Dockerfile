#FROM node:18
#
## Установка зависимостей для Puppeteer
#RUN apt-get update && apt-get install -y \
#    gconf-service \
#    libasound2 \
#    libatk1.0-0 \
#    libc6 \
#    libcairo2 \
#    libcups2 \
#    libdbus-1-3 \
#    libexpat1 \
#    libfontconfig1 \
#    libgcc1 \
#    libgconf-2-4 \
#    libgdk-pixbuf2.0-0 \
#    libglib2.0-0 \
#    libgtk-3-0 \
#    libnspr4 \
#    libpango-1.0-0 \
#    libpangocairo-1.0-0 \
#    libstdc++6 \
#    libx11-6 \
#    libx11-xcb1 \
#    libxcb1 \
#    libxcomposite1 \
#    libxcursor1 \
#    libxdamage1 \
#    libxext6 \
#    libxfixes3 \
#    libxi6 \
#    libxrandr2 \
#    libxrender1 \
#    libxss1 \
#    libxtst6 \
#    ca-certificates \
#    fonts-liberation \
#    libappindicator1 \
#    libnss3 \
#    lsb-release \
#    xdg-utils \
#    wget
#
#WORKDIR /app
#CMD ["node", "main.js"]
#


FROM node:18

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    wget gnupg unzip curl \
    fonts-liberation \
    libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 \
    libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

# Установка Google Chrome (точной версии 134, которую требует Puppeteer)
RUN wget -q https://storage.googleapis.com/chrome-for-testing-public/134.0.6998.35/linux64/chrome-linux64.zip && \
    unzip chrome-linux64.zip && \
    mv chrome-linux64 /opt/chrome && \
    ln -s /opt/chrome/chrome /usr/bin/google-chrome && \
    rm chrome-linux64.zip

# Переменная окружения для Puppeteer
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome

WORKDIR /app
#COPY package*.json ./
#RUN npm install
#COPY . .

CMD ["node", "main.js"]
