# syntax=docker/dockerfile:1
FROM node:16-alpine

RUN npm install -g dotenv-cli

WORKDIR /app

COPY start.sh .
COPY client client
COPY server server

WORKDIR /app/server
RUN npm i

WORKDIR /app/client
RUN npm i && npm run prod-build

WORKDIR /app

EXPOSE 3000

CMD ["sh", "start.sh"]