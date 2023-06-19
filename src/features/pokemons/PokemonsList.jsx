import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPokemons, fetchPokemonsThunk } from './pokemonsSlice'
import PokemonCard from './PokemonCard'
import Loader from '../../components/Loader'

export default function PokemonList() {
  const dispatch = useDispatch();

  const pokemons = useSelector(selectAllPokemons);
  const { 
    status, 
    error, 
    filteredPokemons, 
    searchQuery,
    typeFilter,
    abilityFilter
  } = useSelector(state => state.pokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemonsThunk());
    }
  },[status, dispatch])

  let pokemonElements;

  if (status === 'loading') {
    pokemonElements = <Loader />
  } else if (status === 'succeeded') {
      pokemonElements = pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
  } else if (status === 'failed') {
    pokemonElements = <div>{error}</div>
  }

  let filteredPokemonsElements;

  if (filteredPokemons.length > 0) {
    filteredPokemonsElements = (
      <div className='search--results'>
        <div>
          {
            (searchQuery || typeFilter || abilityFilter) && 
            <p>{filteredPokemons.length} Pokemón passer dine kriterier.</p>
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
  } else {
    if (searchQuery !== '' || typeFilter !== '' || abilityFilter !== '') {
        filteredPokemonsElements = <p>Ingen treff.</p>
    } else {
      filteredPokemonsElements = pokemonElements;
    }
  }
  
  return (
    <section className="pokemon-list">
      {filteredPokemons ? filteredPokemonsElements : pokemonElements}
    </section>
  )
}
