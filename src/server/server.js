const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const ErrorHandler = require('./server/middleware/ErrorHandler.js');
const task_router = require('./server/routes/task.js');
const pokemon_router = require('./server/routes/pokemon.js');
const statistics_route = require('./server/routes/statistics.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./server/db/models');

const app = express();

Promise.resolve(db.sequelize.sync({ force: true }));
console.log("All models were synchronized successfully.");

// middleware
app.use(bodyParser.json());
app.use([cors(), morgan("common"), compression(), express.json()]);
app.use(express.static("public"))

app.use('/task', task_router);

app.use('/pokemon', pokemon_router);

app.use('/statistics', statistics_route);

app.use(ErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
    console.log('Uncaught Rejection', reason.message);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});

const server = app.listen(process.env.PORT || 3000, () => {
    const { address, port } = server.address();
    console.log('Express app listening at http://%s:%s', address, port);
});