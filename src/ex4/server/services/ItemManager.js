const { GetPokemonById, GetPokemonsByList } = require('./PokemonService.js');
const StorageService = require('./StorageService.js');

async function ReadTasks() {
 /* try {
    // get json object
    const file_read_promise = await file_manager.ReadFromFileTasks();
    // assing json object to tasks
    return file_read_promise;
  } catch (error) {
    console.log(error);
  }*/
}

async function WriteTasks(tasks) {
  /*try {
    // set json object to file
    await file_manager.WriteToFileTasksArray(tasks);
  } catch (error) {
    console.log(error);
  }*/
}

async function GetTasks() {
  return await StorageService.GetTasks();
}

async function AddRegularTask(task) {
  await StorageService.CreateTask({ name: task, id: 'Regular task', completed: false });
};

async function AddPokemon(pokemon_id) {
  try {
    const tasks = await GetTasks();
    const pokemon = await GetPokemonById(pokemon_id);
    InsertPokemon(pokemon, tasks);
    await WriteTasks(tasks);
  } catch (error) {
    if (error.response.status === 404) {
      const err = new Error(`Pokemon with ID ${pokemon_id} was not found`);
      err.statusCode = 404;
      throw err;
    }
    throw error;
  }
};

async function AddPokemons(list) {
  try {
    const tasks = await GetTasks();
    const pokemons = await GetPokemonsByList(list);
    const errors = [];
    pokemons.forEach((pokemon) => {
      try {
        InsertPokemon(pokemon, tasks);
      } catch (error) {
        errors.push(error);
      }
    });
    if (errors.length)
      throw errors;
    await WriteTasks(tasks);
  } catch (error) {
    throw error;
  }
}

async function DeleteTasks() {
  await WriteTasks([]);
}

async function DeleteTask(task_id) {
  const tasks = await GetTasks();
  tasks.splice(task_id, 1);
  await WriteTasks(tasks);
}

async function CompleteTask(task_id) {
  const tasks = await GetTasks();
  tasks[task_id].completed = !tasks[task_id].completed;
  await WriteTasks(tasks);
}

async function SortTasksByName() {
  const tasks = await GetTasks();
  tasks.sort((a, b) => {
    // tasks object has name or data for error
    const item1 = a.name;
    const item2 = b.name;
    if (typeof item1 === 'undefined' || typeof item2 === 'undefined')
      throw new Error('Task is undefined');
    return item1.toLowerCase().localeCompare(item2.toLowerCase());
  });
  await WriteTasks(tasks);
}

function CheckIfPokemonExists(tasks, id) {
  return tasks.find((task) => task.id === id);
}

function InsertPokemon(pokemon, tasks) {
  try {
    if (!CheckIfPokemonExists(tasks, pokemon.id))
      tasks.push({ name: pokemon.name, images: pokemon.images, id: pokemon.id, completed: false });
    else {
      const error = new Error(`Pokemon Exists with id: ${pokemon.id}`);
      error.statusCode = 409;
      throw error;
    }
  }
  catch (error) {
    throw error;
  }
}
const _isNumber = value => !isNaN(Number(value));
const _isList = value => value.split(",").every(this._isNumber);

const ItemManagerService = {
  GetTasksFromFile: GetTasks,
  AddPokemon,
  AddPokemons,
  AddRegularTask,
  DeleteTask,
  DeleteTasks,
  CompleteTask,
  SortTasksByName,
  _isList,
  _isNumber
};

module.exports = ItemManagerService;
