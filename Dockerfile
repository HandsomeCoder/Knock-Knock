# syntax=docker/dockerfile:1
FROM postgres:14-alpine

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB knock-knock

RUN apk add --update nodejs npm

WORKDIR /app

COPY start.sh .
COPY client client
COPY server server

WORKDIR /app/server
RUN npm i

WORKDIR /app/client
RUN npm i && npm run build

WORKDIR /app

EXPOSE 3000

CMD ["sh", "start.sh"]