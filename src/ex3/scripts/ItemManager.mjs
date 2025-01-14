/* eslint-disable no-return-await */
/* eslint-disable no-constructor-return */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import PokemonClient from './PokemonClient.mjs';
import FileManager from './FileManager.mjs';

export default class ItemManager {
  constructor() {
    this.pokemon_client = new PokemonClient();
    this.pokemons = [];
    this.tasks = [];
    this.file_manager = new FileManager();
    this.InitPokemons();
  }

  /**
     * init pokemon names array
     */
  async InitPokemons() {
    const pokemons_names_response = await this.pokemon_client.GetPokemonsNames();
    this.ParsePokemonNamesResponse(pokemons_names_response);
  }

  /**
     * sets the json object to the array of tasks
     */
  async SetArrayFromFile() {
    try {
      // get json object
      const file_read_promise = await this.file_manager.ReadFromFileTasks();
      // assing json object to tasks
      this.tasks = file_read_promise;
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * gets string and checks what case it is
     * @param {string} task_text string from input
     */
  async AddTask(task_text) {
    // parse text to int
    const pokemon_id = Number.parseInt(task_text, 10);
    // check if text has commas
    if (task_text.indexOf(',') > -1 && Number.parseInt(task_text.split(',')[0], 10)) {
      const pokemos = await this.GetMultiplePokemons(task_text);
      pokemos.forEach((pokemon) => this.InsertPokemonToArrayWrapperFunction(pokemon));
    } else if (Number.isInteger(pokemon_id)) { // check if its number
      const pokemon = await this.GetOnePokemon(pokemon_id);
      this.InsertPokemonToArrayWrapperFunction(pokemon);
    } else { // regular task
      this.InsertResultToArray(task_text);
    }
    this.file_manager.WriteToFileTasksArray(this.tasks);
  }

  /**
     * calls the functions to insert pokemon correctly
     * @param {Object} pokemon  pokemon object from api
     */
  InsertPokemonToArrayWrapperFunction(pokemon) {
    if (pokemon.name !== 'Error') {
      const pokemon_filtered = this.FilterPokemonAttributes(pokemon);
      this.InsertResultToArray(pokemon_filtered);
    } else { this.InsertResultToArray(pokemon); }
    this.file_manager.WriteToFileTasksArray(this.tasks);
  }

  /**
     * removes a task from array
     * @param {int} task_to_remove_id task location in array
     */
  RemoveTask(task_to_remove_id) {
    const id_parsed_int = Number.parseInt(task_to_remove_id, 10);
    if (id_parsed_int && id_parsed_int < this.tasks.length) {
      const tasks = this.tasks.filter((task, index) => index !== id_parsed_int);
      this.file_manager.WriteToFileTasksArray(tasks);
    } else { throw new Error('Task id illegal.'); }
  }

  /**
     * send id to pokemon client and insert it to tasks array
     * @param {int} id
     */
  async GetOnePokemon(id) {
    // send the id to pokemon client
    return await Promise.resolve(this.pokemon_client.GetPokemonById(id));
  }

  /**
     * parse string from input send it to pokemon client and insert it to tasks array
     * @param {string} ids string from input
     */
  async GetMultiplePokemons(ids) {
    const pokemon_ids = ids.split(',');
    return await Promise.resolve(this.pokemon_client.GetPokemonsByList(pokemon_ids));
  }

  /**
     * inserts result to
     * @param {string} result
     * @param {int} id
     */
  InsertResultToArray(result) {
    // check if found pokemon
    if (typeof result.name !== 'undefined' && result.name !== 'Error') {
      if (!this.CheckIfPokemonExists(result.id)) {
        this.tasks.push({
          name: result.name, images: result.images, id: result.id, completed: false,
        });
      }// found pokemon add the name and id of pokemon
    } else if (typeof result === 'object') {
      this.tasks.push({ data: result.message, id: 'Error', completed: false });
    } else { this.tasks.push({ name: result, id: 'Regular task', completed: false }); }
  }

  /**
     * clear all tasks
     */
  ClearArray() {
    this.tasks = [];
    this.file_manager.WriteToFileTasksArray(this.tasks);
  }

  /**
     * sort tasks array
     */
  SortArrayByName() {
    this.tasks.sort((a, b) => {
      // tasks object has name or data for error
      const item1 = a.name || a.data;
      const item2 = b.name || b.data;
      if (typeof item1 === 'undefined' || typeof item2 === 'undefined') { throw new Error('Task is undefined'); }
      return item1.toLowerCase().localeCompare(item2.toLowerCase());
    });
    this.file_manager.WriteToFileTasksArray(this.tasks);
    return true;
  }

  /**
     * check if pokemon is in tasks
     * @param {int} id id of pokemon to find
     * @returns true if found false if not found
     */
  CheckIfPokemonExists(id) {
    return this.tasks.find((task) => task.id === id);
  }

  /**
     * parses response into pokemons array
     * @param {Array} response
     */
  ParsePokemonNamesResponse(response) {
    if (response.name !== 'Error') {
      response.forEach((pokemon) => {
      // split url string and get rid of empty elements
        const parsed_url = pokemon.url.split('/').filter((item) => item);
        const id = parsed_url[parsed_url.length - 1];
        this.pokemons.push({ name: pokemon.name, id });
      });
    }
  }

  /**
     * filters the pokemon object from api and takes only the images
     * @param {Object} pokemon_object pokemon object from api
     * @returns
     */
  FilterPokemonAttributes(pokemon_object) {
    // new pokemon object
    const pokemon_filtered = { name: pokemon_object.name, id: pokemon_object.id, images: {} };
    // images url from object
    const images_unfiltered = pokemon_object.sprites;
    // eslint-disable-next-line array-callback-return
    // eslint-disable-next-line consistent-return
    const images = Object.entries(images_unfiltered).filter((value) => {
      // get only attributes of url (filters null and other objects)
      if (typeof value[1] !== 'object') return value;
    });
    // appends it to the new object
    images.forEach((value) => {
      pokemon_filtered.images = { ...pokemon_filtered.images, ...{ [value[0]]: value[1] } };
    });
    return pokemon_filtered;
  }

  /**
     * toggle completed attribute
     * @param {int} task_id
     */
  CompleteTask(task_id) {
    this.tasks[task_id].completed = !this.tasks[task_id].completed;
    this.file_manager.WriteToFileTasksArray(this.tasks);
  }
}
