const express = require('express');
const { checkSchema } = require('express-validator');
const {
    GetTasks,
    AddTask,
    DeleteTasks,
    DeleteTask,
    CompleteTask,
    SortTasksByName
} = require('../controllers/TaskController.js');
const { SCHEMA_ID, SCHEMA_TASK } = require('../validation/scehma.js');

const task_router = express.Router();

task_router.get('/', GetTasks);
task_router.post('/', checkSchema(SCHEMA_TASK), AddTask);
task_router.delete('/', DeleteTasks);
task_router.delete('/:id', checkSchema(SCHEMA_ID), DeleteTask);
task_router.put('/sortbyname', SortTasksByName)
task_router.patch('/:id', checkSchema(SCHEMA_ID), CompleteTask);

module.exports = task_router;