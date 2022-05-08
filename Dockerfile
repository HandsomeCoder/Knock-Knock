# syntax=docker/dockerfile:1
FROM node:18-alpine
WORKDIR /client
COPY client .
RUN npm i && npm run build && npm run serve