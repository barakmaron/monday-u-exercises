FROM node:14.15-alpine

WORKDIR /app

COPY ./src/server .

RUN npm install
EXPOSE 8000
CMD ["docker run -p 3306:3306 --name tododb -e MYSQL_ROOT_PASSWORD=password -e MYSQL_ROOT_HOST=% -e MYSQL_DATABASE=todo_db -d mysql/mysql-server"]
CMD ["node", "./server.js"]
