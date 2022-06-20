import { LOADER, POKEMON_IMAGE_DIV, TASK_HTML, ERROR } from '../config/GlobalConses.js';

export default class DomManager {
  constructor() {
    this.task_input = document.querySelector('#todo_input');
    this.task_container = document.querySelector('#todo_tasks_container');
    this.add_task_button = document.querySelector('#add_to_do_button');
    this.tasks_counter = document.querySelector('#task_counter');
    this.clear_all_button = document.querySelector('#clear_all_tasks_button');
    this.sort_by_name_button = document.querySelector('#sort_by_name');
    this.pokemon_data_list = document.querySelector('#pokemons_names');
  }

  clearInput() {
    this.task_input.value = '';
  }

  AddNewTask(id, task_object, delete_call_back, complete_call_back) {
    const new_task_from_html = this.CreateElementFromHtml(TASK_HTML);
    const task_number = new_task_from_html.querySelector('.task_number');
    const task_text = new_task_from_html.querySelector('.task_text');
    const task_delete_button = new_task_from_html.querySelector('.delete_task_button');
    const task_complete_button = new_task_from_html.querySelector('.complete_task_button');
    task_delete_button.id = id;
    task_complete_button.id = id;

    if (task_object.completed) { new_task_from_html.classList.add('completed_task'); }
    // Delete empty state from task container
    this.task_container.classList.remove('empty');
    if (Number.isInteger(task_object.id)) {
      task_text.after(this.PokemonImageElement(task_object));
      // adds text to task
      task_text.innerHTML = `Catch ${task_object.name}`;
    } else
      task_text.innerHTML = task_object.name;
    // adds numbers to tasks
    task_number.innerText = (this.task_container.children.length + 1).toString().concat(')');
    this.clearInput();
    // adds event listeners to elements
    task_delete_button.addEventListener('click', (event) => {
      delete_call_back(event);
    });
    task_complete_button.addEventListener('click', (event) => {
      this.MarkAsCompleteTask(event);
      complete_call_back(event);
    });
    task_text.addEventListener('click', this.TaskClick);
    this.task_container.append(new_task_from_html);
    // updates task counter
    this.UpdateTaskCounter();
  }

  PokemonImageElement(task_object) {
    const pokemon_image_sprites_container = this.CreateElementFromHtml(POKEMON_IMAGE_DIV);
    Object.entries(task_object.images).forEach((image_attribute, index) => {
      // adds all images from api
      const pokemon_image = document.createElement('img');
      pokemon_image.id = index;
      // adds class for animation
      if (index === 0) 
        pokemon_image.classList.add('show');
      else 
        pokemon_image.classList.add('hide'); 
      pokemon_image.classList.add('pokemon_image');
      [, pokemon_image.src] = image_attribute;
      pokemon_image_sprites_container.appendChild(pokemon_image);
    });
    return pokemon_image_sprites_container;
  }

  AddNewTaskByKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.add_task_button.click();
    }
  }

  MarkAsCompleteTask(event) {
    event.currentTarget.parentNode.parentNode.classList.toggle('completed_task');
    this.UpdateTaskCounter();
  }

  TaskClick() {
    alert(this.innerHTML);
  }

  UpdateTaskCounter() {
    const tasks_number = this.task_container.children.length;
    // takes in consideration task completed
    const task_completed = this.task_container.querySelectorAll('.completed_task').length;
    this.tasks_counter.innerHTML = tasks_number - task_completed;
  }

  ShowErrorEmptyTaskInput() {
    this.task_input.reportValidity();
    this.task_input.setCustomValidity('Please supply a task name.');
  }

  ClearErrorEmptyTask() {
    this.task_input.setCustomValidity('');
  }

  RenderDomFromArray(todos, delete_call_back, complete_call_back) {
    const todos_copy = [...todos];
    // clear task container for rendering
    this.task_container.innerHTML = '';
    if (todos_copy.length) 
      todos_copy.map((todo, key) => {
        this.AddNewTask(key, todo, delete_call_back, complete_call_back);
      });
    else 
      this.task_container.classList.add('empty'); 
    this.UpdateTaskCounter();
  }

  PokemonImageAnimation() {
    const image_showing = document.querySelectorAll('.show');// select all images that are showing
    image_showing.forEach((image) => {
      let next_image = image.nextSibling;// next image in animation
      // check if end of images
      if (next_image === null) 
        next_image = image.parentNode.firstChild; 
      image.classList.add('hide');
      image.classList.remove('show');
      next_image.classList.remove('hide');
      next_image.classList.add('show');
    });
  }

  AddPokemonsToDataList(pokemons_array) {
    const options = [];
    pokemons_array.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.id;
      option.label = pokemon.name;
      options.push(option);
    });
    options.forEach((option) => this.pokemon_data_list.append(option));
  }

  CreateElementFromHtml(html) {
    const temp = document.createElement('template');
    const html_parsed = html.trim();
    temp.innerHTML = html_parsed;
    return temp.content.firstChild;
  }

  CreateLoader()
  {
    const main_container = document.querySelector('#main_container');
    const loader = this.CreateElementFromHtml(LOADER);
    main_container.appendChild(loader);
  }

  DeleteLoader()
  {
    const loader = document.querySelector('.spinner_container');
    loader.remove();
  }

  ShowErrorElement(message)
  {
    const main_container = document.querySelector('#main_container');
    const error = this.CreateElementFromHtml(ERROR);
    error.innerHTML = message;
    main_container.appendChild(error);
  }

  DestroyErrorElement()
  {
    const error = document.querySelector('.error');
    error.remove();
  }
}