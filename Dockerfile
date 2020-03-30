# Test
FROM node:12.16.1-alpine AS test
COPY / ./app
WORKDIR /app

RUN npm install

CMD ["npm", "test"]

# ---------- Builder ----------
FROM node:12.16.1-alpine as builder

# Copy files
COPY --from=test /app ./app
WORKDIR /app

RUN npm install && npm run build:prod

# ---------- End Builder ----------
FROM node:12.16.1-alpine

# Copy files
COPY --from=builder /app/dist ./app/dist
WORKDIR /app

COPY server/index.js ./
COPY server/package.json ./

# Dependencies
ENV NODE_ENV=production PUBLIC_PATH="./dist"
RUN npm install

# Port exposing
EXPOSE 9000

CMD ["npm", "start"]
