const PokemonService = require('./PokemonService.js');
const StorageService = require('./StorageService.js');

async function GetTasks() {
  return await StorageService.GetTasks();
}

async function AddRegularTask(task) {
  return await StorageService.CreateTask({ name: task, is_pokemon: false, status: false });
};

async function AddPokemon(pokemon_id, pokemon_object = null) {
  try {
    const pokemon = pokemon_object || await PokemonService.GetPokemonById(pokemon_id);
    console.log(pokemon);
    const ret = await StorageService.CreatePokemon({ name: pokemon.name, images: pokemon.images, is_pokemon: true, id: pokemon.id, status: false});
    console.log(ret);
  } catch (error) {
    ValidateError(error, pokemon_id);
  }
};

async function AddPokemons(list) {
  try {
    const pokemons = await PokemonService.GetPokemonsByList(list);
    const errors = [];
    const added_pokemons = pokemons.map(async (pokemon) => {
      try {
        return await AddPokemon(pokemon.id, pokemon);
      } catch (error) {
        errors.push(error);
      }
    });
    await Promise.all(added_pokemons);
    if (errors.length)
      throw errors; 
    return;
  } catch (error) {
    throw error;
  }
}

async function DeleteTasks() {
  await StorageService.DeleteTasks();
}

async function DeleteTask(task_id) {
  await StorageService.DeleteTask(task_id);
}

async function CompleteTask(task_id) {
  await StorageService.UpdateTaskStatus(task_id);
}

async function SortTasksByName() {
  return await StorageService.GetTasks('ASC');
}

async function UpdateTask(id, text)
{ 
  await StorageService.UpdateTaskText(id, text);
}

function ValidateError(error, pokemon_id)
{
  if(error.message === 'Validation error')
    {
      const err = new Error(`Pokemon with ID ${pokemon_id} exits in database`);
      err.statusCode = 409;
      throw err;
    }
    else if (error.response.status === 404) {
      const err = new Error(`Pokemon with ID ${pokemon_id} was not found`);
      err.statusCode = 404;
      throw err;
    }
    throw error;
}

const _isNumber = value => !isNaN(Number(value));
const _isList = value => value.split(",").every(_isNumber);

const ItemManagerService = {
  GetTasksFromFile: GetTasks,
  AddPokemon,
  AddPokemons,
  AddRegularTask,
  DeleteTask,
  DeleteTasks,
  CompleteTask,
  SortTasksByName,
  UpdateTask,
  _isList,
  _isNumber
};

module.exports = ItemManagerService;
