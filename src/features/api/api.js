import { TYPE_DATA } from '../../common/utils/constants/TYPE_DATA'

/**
 * Fetches the Pokemon data from the API.
 * @async
 * @func fetchPokemons
 * @returns {Promise<Object[]>} The array of Pokemon data.
 * @throws {Error} If there is an error fetching the data.
 */
export const fetchPokemons = async () => {
  const limit = 200;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to get Pokemons');
  }
  const data = await response.json();

  /**
   * @typedef {Object} PokemonData
   * @property {string} name - The name of the Pokemon.
   * @property {string} url - The URL of the Pokemon's details.
   * @property {string} image - The URL of the Pokemon's image.
   * @property {number} hp - The HPof the Pokemon.
   * @property {Object[]} abilities - The abilities of the Pokemon.
   * @property {number} id - The ID of the Pokemon.
   * @property {string} type - The type of the Pokemon.
   * @property {string} backgroundColor - The background color for the Pokemon's type.
   * @property {string} icon - The icon for with the Pokemon's type.
   * @property {boolean} myPokemon - To save/delete Pokemon from the user's list.
   */
  
  const pokemonDataPromises = data.results.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error(`Failed to get data for ${pokemon.name}`);
    }
    const pokemonData = await response.json();
    const pokemonType = pokemonData.types[0].type.name
    
    /**
     * @type {PokemonData}
     */

    return {
      name: pokemon.name,
      url: pokemon.url,
      image: pokemonData.sprites.other['dream_world']["front_default"],
      hp: pokemonData.stats[0].base_stat,
      abilities: pokemonData.abilities,
      id: pokemonData.id,
      type: pokemonType,
      backgroundColor: TYPE_DATA[pokemonType].background,
      icon: TYPE_DATA[pokemonType].icon,
      myPokemon: false
    };
  });
  
  const pokemons = await Promise.all(pokemonDataPromises);
  
  return pokemons;
}