FROM node:14.15-alpine

WORKDIR /app

COPY ./src/server .

RUN npm install
RUN npm install -g sequelize-cli
RUN npm install --save mysql2

CMD ["node", "./server.js"]
