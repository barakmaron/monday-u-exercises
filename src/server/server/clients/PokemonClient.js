/* eslint-disable camelcase */
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
class PokemonClient {
  constructor() {
    dotenv.config({ path: path.resolve(__dirname, '../config/.env') });
    this.base_url = process.env.POKEMON_BASE_URL;
    this.pokemons_url = process.env.POKEMON_NAMES_URL;    
  }
  
  /**
  * send a get request to pokemon api with id parse result
  * @param {string} id id
  * @returns {string} parsed result from api
  */
  async FetchRequestById(id) {
    return axios.get(this.base_url.concat(id)).then((response) => {     
     return response.data;
    });
  }

  async FetchAllPokemonsNamesRequest() {
    return axios.get(this.pokemons_url).then((response) => {     
     return response.data.results;
    });
  }
}

module.exports = PokemonClient;