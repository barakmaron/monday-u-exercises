const express = require('express');

const {
    GetPokemons,
} = require('../controllers/PokemonController.js');

const pokemon_router = express.Router();

pokemon_router.get('/', GetPokemons);

module.exports = pokemon_router;