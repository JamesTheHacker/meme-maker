FROM node:17-slim as build

RUN apt-get update \
  && apt-get install -y build-essential graphicsmagick

WORKDIR /meme-maker/

COPY package.json package-lock.json /meme-maker/

RUN  npm ci --silent

COPY . .

USER node

CMD npm start