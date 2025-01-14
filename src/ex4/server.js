const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const ErrorHandler = require('./server/middleware/ErrorHandler.js');
const task_router = require('./server/routes/task.js');
const pokemon_router = require('./server/routes/pokemon.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use([cors(), morgan("common"), compression(), express.json()]);


app.use('/task', task_router);

app.use('/pokemon', pokemon_router);

app.use(ErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
    console.log('Uncaught Rejection', reason.message);
    throw reason;
});

process.on('uncaughtException', (error) => {
    console.log("Uncaught Exception", error.message);
    process.exit(1);
});

const server = app.listen(8000, () => {
    const { address, port } = server.address();
    console.log('Express app listening at http://%s:%s', address, port);
});