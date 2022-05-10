
# Knock-Knock Messenger
A one-to-one realtime chat app.

## Running Application in Local

```
psql

CREATE DATABASE knock-knock;

\q

cd server
npm install

// seed the database
npm run seed
npm run serve
```

## Running Application in Docker

Build Docker image
```
docker image build -t <tag> knock-knock .
```  

Deploy Docker image
```
docker run --name knock-knock -d -p 3000:3000 knock-knock:1.0.0
```

## Demo

 https://knock-knock-messenger.herokuapp.com