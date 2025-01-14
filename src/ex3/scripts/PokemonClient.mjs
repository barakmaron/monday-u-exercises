/* eslint-disable camelcase */

export default class PokemonClient {
  constructor() {
    this.base_url = 'https://pokeapi.co/api/v2/pokemon/';
    this.pokemons_url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  }

  async GetPokemonsNames() {
    const req = this.FetchAllPokemonsNamesRequest();
    return Promise.resolve(req);
  }

  /**
     * send one request to pokemon api
     * @param {int} id pokemon id
     * @returns response from pokemon api
     */
  async GetPokemonById(id) {
    const req = this.FetchRequestById(id);
    return Promise.resolve(req);
  }

  /**
     * sends parallel requests to pokemon api
     * @param {array[string]} ids array of ids
     * @returns list of responses from pokemon api
     */
  async GetPokemonsByList(ids) {
    const requests = [];
    ids.forEach(async (id) => {
      const req = this.FetchRequestById(id);
      requests.push(req);
    });
    return Promise.all(requests);
  }

  /**
     * send a get request to pokemon api with id parse result
     * @param {string} id id
     * @returns {string} parsed result from api
     */
  async FetchRequestById(id) {
    return fetch(this.base_url.concat(id)).then(async (response) => {
      try {
        // check if response is valid
        if (!response.ok) {
          throw new Error(`Pokemon with ID ${id} was not found`);
        }
        // parse response to json object
        const res_obj = await response.json();
        return res_obj;
      } catch (error) {
        return error;
      }
    });
  }

  async FetchAllPokemonsNamesRequest() {
    return fetch(this.pokemons_url).then(async (response) => {
      try {
        // check if response is valid
        if (!response.ok) {
          throw new Error('Cant get pokemons names from API.');
        }
        // parse response to json object
        const res_obj = await response.json();
        return res_obj.results;
      } catch (error) {
        return error;
      }
    });
  }
}
