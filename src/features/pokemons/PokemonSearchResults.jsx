import { useSelector } from 'react-redux'

import PokemonCard from './PokemonCard'

export default function PokemonSearchResults() {
  const {
    filteredPokemons, 
    searchQuery,
    typeFilter,
    abilityFilter,
    sortBy
  } = useSelector(state => state.pokemons);

  const searchExists = Boolean(searchQuery || typeFilter || abilityFilter || sortBy);

  let filteredPokemonsElements;

  if (filteredPokemons.length > 0 && searchExists) {
    filteredPokemonsElements = (
      <div>
        <div>
          {
            searchExists && 
            <p>{filteredPokemons.length} Pokémon passer dine kriterier.</p>
          }
        </div>
        <div className='search--pokemons-list'>
          {
            filteredPokemons.map(pokemon => 
              <PokemonCard key={pokemon.id} pokemon={pokemon} />)
          }
        </div>
      </div>
    )
  } 
  
  if (searchExists && filteredPokemons.length === 0) {
      filteredPokemonsElements = <p>Ingen treff.</p>
  }

  return (
    <section className='search--results'>
      {searchExists && <h2>Søkeresultater</h2>}
      {filteredPokemonsElements}
    </section>
  )
}