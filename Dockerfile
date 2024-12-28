FROM --platform=linux/amd64 node:20-alpine3.20 AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM --platform=linux/amd64 node:20-alpine3.20
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY prisma ./prisma/
COPY package.json .
RUN npx prisma generate
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
