FROM node:14.15-alpine

WORKDIR /app

COPY ./src/server .

RUN npm install

CMD ["node", "./server.js"]
