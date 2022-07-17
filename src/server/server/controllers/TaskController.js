const ItemManagerService = require("../services/ItemManager.js");

/**
* get all tasks
*/
async function GetTasks(request, response) {
  const tasks = await ItemManagerService.GetTasksFromFile();
  return response.status(200).json({
    status: 200,
    tasks: tasks
  });
}
/**
* add task end point
*/
async function AddTask(request, response, next) {
  try {
    const { task } = request.body;
    const pokemon_id = Number.parseInt(task, 10);
    let task_inserted;
    // check if text has commas and only numbers
    if (task.indexOf(',') > -1 && ItemManagerService._isList(task)) {
      task_inserted = ItemManagerService.AddPokemons(task);
    } else if (ItemManagerService._isNumber(pokemon_id)) {
      task_inserted = ItemManagerService.AddPokemon(pokemon_id);
    } else { // regular task
      task_inserted = ItemManagerService.AddRegularTask(task);
    }
    console.log(response.status);
    await task_inserted;    
    return response.status(201).json({
      status: 201,
      task: task
    });
  } catch (error) {
    next(error);
  }
}
/*
*  delete all task end point
*/
async function DeleteTasks(request, response) {
  await ItemManagerService.DeleteTasks();
  return response.status(200).json({
    status: 200
  });
}
/*
* delete task end point
*/
async function DeleteTask(request, response, next) {
  try {
    const task_id = Number.parseInt(request.params.id, 10);
    if (Number.isNaN(task_id))
      throw ErrorBadRequest();
    await ItemManagerService.DeleteTask(task_id);
    return response.status(200).json({
      status: 200,
      id: task_id,
    });
  }
  catch (err) {
    next(err);
  }
}

async function CompleteTask(request, response, next) {
  try {
    const task_id = Number.parseInt(request.params.id, 10);
    if (Number.isNaN(task_id))
      throw ErrorBadRequest();
    await ItemManagerService.CompleteTask(task_id);
    return response.status(200).json({
      status: 200,
      id: task_id,
    });
  }
  catch (error) {
    next(error);
  }
}

async function SortTasksByName(request, response, next) {
  try {
    const tasks = await ItemManagerService.SortTasksByName();
    return response.status(200).json({
      status: 200,
      tasks: tasks
    });
  }
  catch (error) {
    next(error);
  }
}

async function UpdateTask(request, response, next) {
  try {
    const task_id = Number.parseInt(request.params.id, 10);
    const task = request.body;
    if (Number.isNaN(task_id))
      throw ErrorBadRequest();
    await ItemManagerService.UpdateTask(task_id, task.task_text);
    return response.status(200).json({
      status: 200,
      id: task_id,
    });
  }
  catch (error) {
    next(error);
  }
}

function ErrorBadRequest() {
  const error = Error();
  error.statusCode = 400;
  error.message = "Wrong parameters";
  return error;
}

module.exports = {
  GetTasks,
  AddTask,
  DeleteTask,
  DeleteTasks,
  CompleteTask,
  SortTasksByName,
  UpdateTask
};