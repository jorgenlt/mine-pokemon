export const filterByName = (searchQuery, pokemons) => {
  if (searchQuery) {
    return pokemons.filter(pokemon =>
      pokemon.name.startsWith(searchQuery.toLowerCase())
    );
  }
  return pokemons;
};

export const filterByType = (typeFilter, pokemon) => {
  if (typeFilter) {
    return pokemon.type === typeFilter;
  }
  return true;
};

export const filterByAbility = (abilityFilter, pokemon) => {
  if (abilityFilter) {
    return pokemon.abilities.some(
      ability => ability.ability.name === abilityFilter
    );
  }
  return true;
};

export const sortPokemons = (sortBy, pokemons) => {
  switch (sortBy) {
    case 'name':
      return pokemons.sort((a, b) => a.name.localeCompare(b.name));
    case 'hp':
      return pokemons.sort((a, b) => b.hp - a.hp);
    default:
      return pokemons;
  }
};
