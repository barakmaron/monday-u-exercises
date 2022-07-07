import React from 'react';

import  Task  from '../Task';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Task',
  component: Task,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    
  },
};

const Template = (args) => <Task {...args} />;
const item_pokemon = {
  "id": 1,
  "ItemName": "bulbasaur",
  "status": true,
  "is_pokemon": true,
  "createdAt": "2022-06-21T13:04:45.000Z",
  "updatedAt": "2022-06-23T14:46:49.000Z",
  "PokemonDatum": {
    "id": 1,
    "items_id": 1,
    "pokemon_id": 1,
    "createdAt": "2022-06-21T13:04:45.000Z",
    "updatedAt": "2022-06-21T13:04:45.000Z",
    "PokemonImages": [
      {
        "id": 4,
        "pokemon_id": 1,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
        "createdAt": "2022-06-21T13:04:45.000Z",
        "updatedAt": "2022-06-21T13:04:45.000Z"
      },
      {
        "id": 3,
        "pokemon_id": 1,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        "createdAt": "2022-06-21T13:04:45.000Z",
        "updatedAt": "2022-06-21T13:04:45.000Z"
      },
      {
        "id": 2,
        "pokemon_id": 1,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
        "createdAt": "2022-06-21T13:04:45.000Z",
        "updatedAt": "2022-06-21T13:04:45.000Z"
      },
      {
        "id": 1,
        "pokemon_id": 1,
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
        "createdAt": "2022-06-21T13:04:45.000Z",
        "updatedAt": "2022-06-21T13:04:45.000Z"
      }
    ]
  }
};

const item_regular = {
  "id": 28,
  "ItemName": "clean code",
  "status": false,
  "is_pokemon": false,
  "createdAt": "2022-06-23T16:08:00.000Z",
  "updatedAt": "2022-06-23T16:08:00.000Z",
  "PokemonDatum": null
};

export const Regular = Template.bind({});
Regular.args = {
  number: 1,
  item: item_regular
};

export const Pokemon = Template.bind({});
Pokemon.args = {
  number: 1,
  item: item_pokemon
};
