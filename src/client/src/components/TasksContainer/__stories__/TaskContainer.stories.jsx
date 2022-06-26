import React from 'react';

import  TaskContainer  from '../TaskContainer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/TaskContainer',
  component: TaskContainer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
   
  },
};

const tasks = [
  {
    "id": 10,
    "ItemName": "barak maron",
    "status": false,
    "is_pokemon": false,
    "createdAt": "2022-06-26T11:12:03.000Z",
    "updatedAt": "2022-06-26T11:12:03.000Z",
    "PokemonDatum": null
  },
  {
    "id": 2,
    "ItemName": "bulbasaur",
    "status": false,
    "is_pokemon": true,
    "createdAt": "2022-06-26T10:24:56.000Z",
    "updatedAt": "2022-06-26T10:24:56.000Z",
    "PokemonDatum": {
      "id": 1,
      "items_id": 2,
      "pokemon_id": 1,
      "createdAt": "2022-06-26T10:24:56.000Z",
      "updatedAt": "2022-06-26T10:24:56.000Z",
      "PokemonImages": [
        {
          "id": 10,
          "pokemon_id": 1,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 7,
          "pokemon_id": 1,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 4,
          "pokemon_id": 1,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 1,
          "pokemon_id": 1,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        }
      ]
    }
  },
  {
    "id": 7,
    "ItemName": "charizard",
    "status": false,
    "is_pokemon": true,
    "createdAt": "2022-06-26T10:24:56.000Z",
    "updatedAt": "2022-06-26T10:24:56.000Z",
    "PokemonDatum": {
      "id": 6,
      "items_id": 7,
      "pokemon_id": 6,
      "createdAt": "2022-06-26T10:24:56.000Z",
      "updatedAt": "2022-06-26T10:24:56.000Z",
      "PokemonImages": [
        {
          "id": 28,
          "pokemon_id": 6,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 27,
          "pokemon_id": 6,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 26,
          "pokemon_id": 6,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/6.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 25,
          "pokemon_id": 6,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        }
      ]
    }
  },
  {
    "id": 5,
    "ItemName": "charmander",
    "status": false,
    "is_pokemon": true,
    "createdAt": "2022-06-26T10:24:56.000Z",
    "updatedAt": "2022-06-26T10:24:56.000Z",
    "PokemonDatum": {
      "id": 4,
      "items_id": 5,
      "pokemon_id": 4,
      "createdAt": "2022-06-26T10:24:56.000Z",
      "updatedAt": "2022-06-26T10:24:56.000Z",
      "PokemonImages": [
        {
          "id": 19,
          "pokemon_id": 4,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 17,
          "pokemon_id": 4,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 15,
          "pokemon_id": 4,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        },
        {
          "id": 14,
          "pokemon_id": 4,
          "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
          "createdAt": "2022-06-26T10:24:56.000Z",
          "updatedAt": "2022-06-26T10:24:56.000Z"
        }
      ]
    }
  }
];

const Template = (args) => <TaskContainer {...args} />;
export const Tasks = Template.bind({});
Tasks.args = {
  tasks: tasks
};
