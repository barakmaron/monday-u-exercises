FROM node:14.15-alpine

WORKDIR /app

COPY ./server .

RUN npm install

CMD ["node", "./src/server/server.js"]
