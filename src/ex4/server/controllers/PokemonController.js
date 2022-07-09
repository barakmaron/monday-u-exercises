const PokemonService = require('../services/PokemonService.js');

/**
* get list of all pokemon
*/
async function GetPokemons(request, response, next) {
    try {
        const pokemons = await PokemonService.GetPokemonsNames();
        return response.status(200).json({
            status: 200,
            pokemons: pokemons
        });
    } catch (error) {
        next(error);
    }
}

module.exports = { 
    GetPokemons
};

