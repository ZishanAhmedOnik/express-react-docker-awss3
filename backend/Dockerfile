FROM node:alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json .

RUN npm init -y \
    && npm install

COPY . .