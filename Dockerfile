FROM node:14.15-alpine

WORKDIR /app

COPY ./src/server .

RUN npm install
CMD ['apt get install mysql2']
CMD ["node", "./server.js"]
