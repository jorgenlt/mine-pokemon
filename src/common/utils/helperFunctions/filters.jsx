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
      return pokemons.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    case 'hp':
      return pokemons.slice().sort((a, b) => b.hp - a.hp);
    default:
      return pokemons;
  }
};
