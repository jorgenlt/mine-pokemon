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
    searchQuery 
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
  
  return (
    <section className="pokemon-list">
      {filteredAllPokemons.length > 0 ? (
        filteredAllPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
      ) : (
        searchQuery !== '' ? (
          <p>Finner ingen Pokemon med det navnet. Prøv å endre søket ditt.</p>
        ) : (
          content
        )
      )}
    </section>
  )
}
