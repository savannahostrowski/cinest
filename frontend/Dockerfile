FROM node:20-alpine as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM caddy:alpine
COPY --from=builder /app/dist /usr/share/caddy
COPY runServer.sh /usr/local/bin
RUN chmod +x /usr/local/bin/runServer.sh

EXPOSE 80

CMD ["runServer.sh"]