# BanBan the Kanban board
![screenshot](https://github.com/m0g/banban/blob/main/screenshot.png?raw=true)

## Installation

```bash
npm install
cp sample.env .env
npx prisma migrate dev
```

## Run locally

```bash
npm run dev
```

## Production setup

Use the following `docker-compose` config:

```yaml
services:
  banban:
    image: ghcr.io/m0g/banban:main
    container_name: banban
    restart: always
    environment:
      DATABASE_URL: file:./db/banban.db
      PORT: 3000
      NODE_ENV: production
    volumes:
      - ./docker/db:/app/prisma/db
      - ./docker/storage:/app/storage
    expose:
      - 3000
    ports:
      - '3000:3000'
```

Start the container and run the migrations:

```bash
docker compose up -d
docker compose exec banban npx prisma migrate deploy
```
