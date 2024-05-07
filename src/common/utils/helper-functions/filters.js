/**
 * Filters Pokemons by name based on the search query.
 * @func filterByQuery
 * @param {string} searchQuery - The search query string.
 * @param {Array} pokemons - The array of Pokemons to filter.
 * @returns {Array} The filtered array of Pokemons.
 */
export const filterByQuery = (searchQuery, pokemons) => {
  if (searchQuery) {
    return pokemons.filter(pokemon =>
      pokemon.name.startsWith(searchQuery.toLowerCase())
    );
  }
  return pokemons;
};

/**
 * Filters Pokemons by type based on the type filter.
 * @func filterByType
 * @param {string} typeFilter - The type filter string.
 * @param {Object} pokemon - The Pokemon object to filter.
 * @returns {boolean} Whether the Pokemon matches the type filter or not.
 */
export const filterByType = (typeFilter, pokemon) => {
  if (typeFilter) {
    return pokemon.type === typeFilter;
  }
  return true;
};

/**
 * Filters Pokemons by ability based on the ability filter.
 * @func filterByAbility
 * @param {string} abilityFilter - The ability filter string.
 * @param {Object} pokemon - The Pokemon object to filter.
 * @returns {boolean} Whether the Pokemon has the ability or not.
 */
export const filterByAbility = (abilityFilter, pokemon) => {
  if (abilityFilter) {
    return pokemon.abilities.some(
      ability => ability.ability.name === abilityFilter
    );
  }
  return true;
};

/**
 * Sorts Pokemons based on the given sort criteria.
 * @func sortPokemons
 * @param {string} sortBy - The sort criteria (e.g., 'name', 'hp').
 * @param {Array} pokemons - The array of Pokemons to sort.
 * @returns {Array} The sorted array of Pokemons.
 */
export const sortPokemons = (sortBy, pokemons) => {
  switch (sortBy) {
    case 'name':
      return pokemons.slice().sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    case 'hp':
      return pokemons.slice().sort((a, b) => b.hp - a.hp);
    default:
      return pokemons;
  }
};
