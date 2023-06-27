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

  /**
   * To check if a search exists
   * @const searchExists
   */
  const searchExists = Boolean(searchQuery || typeFilter || abilityFilter || sortBy);

  /**
   * Renders the filtered Pokemon cards if the search exists and returns search results.
   * It the search exists, but returns no results, the user is notified.
   * @member filteredPokemonsElements
   * @returns {JSX.Element[]} The array of rendered Pokemon cards.
   */
  let filteredPokemonsElements;

  if (filteredPokemons.length > 0 && searchExists) {
    filteredPokemonsElements = (
      <div>
        <div>
          {
            searchExists && 
            <p>{filteredPokemons.length} Pokémon matches your search.</p>
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
      filteredPokemonsElements = <p>No Pokémon matches your search.</p>
  }

  return (
    <section className='search--results'>
      {searchExists && <h2>Search Results</h2>}
      {filteredPokemonsElements}
    </section>
  )
}