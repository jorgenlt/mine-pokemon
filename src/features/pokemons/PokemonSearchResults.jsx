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
    /**
     * Renders the filtered Pokemon card if the search exists and returns search results.
     * @returns {JSX.Element[]} The array of rendered Pokemon cards.
     */
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
  
  /**
   * It the search exists, but returns no results, the user is notified.
   * @returns {JSX.Element}
   */
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