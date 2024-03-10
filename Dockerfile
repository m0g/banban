# FROM node:20-alpine
# WORKDIR /app
# COPY package.json package-lock.json ./
# RUN npm install --frozen-lockfile
# COPY . .
# RUN npm run build
# EXPOSE 4173
# CMD ["node", "build"]

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]
