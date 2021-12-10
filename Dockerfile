FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/src/apt/lists/*

COPY package.json .
RUN npm install ytdl-core@latest
RUN npm install yt-search@latest
RUN npm i @adiwajshing/baileys@latest 
RUN npm update

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
