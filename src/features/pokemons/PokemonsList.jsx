import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPokemons, fetchAllPokemons } from './pokemonsSlice'
import PokemonCard from './PokemonCard'
import Loader from '../../components/Loader'

export default function PokemonList() {
  const dispatch = useDispatch();

  const allPokemons = useSelector(selectAllPokemons);
  const { 
    status, 
    error, 
    filteredAllPokemons, 
    searchQuery,
    typeFilter,
    abilityFilter
  } = useSelector(state => state.pokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPokemons());
    }
  },[status, dispatch])

  let content;

  if (status === 'loading') {
    content = <Loader />
  } else if (status === 'succeeded') {
      content = allPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  let filteredPokemons;

  if (filteredAllPokemons.length > 0) {
    filteredPokemons = filteredAllPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
  } else {
    if (searchQuery !== '' || typeFilter !== '' || abilityFilter !== '') {
        filteredPokemons = <p>Ingen treff.</p>
    } else {
      filteredPokemons = content;
    }
  }
  
  return (
    <section className="pokemon-list">
      {filteredAllPokemons ? filteredPokemons : content}
    </section>
  )
}
