FROM node:alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

RUN apk add  --no-cache ffmpeg

COPY package.json .

RUN npm init -y \
    && npm install

COPY . .