import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { selectAllPokemons, fetchPokemons } from './pokemonsSlice'
import PokemonCard from './PokemonCard'

export default function PokemonList() {
  const dispatch = useDispatch();

  const pokemons = useSelector(selectAllPokemons);
  const { status, error, filteredPokemons } = useSelector(state => state.pokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemons());
    }
  },[status, dispatch])

  let content;

  if (status === 'loading') {
    content = <img src="/pikachu.png" className='suspense-loading' alt="pikachu"></img>
  } else if (status === 'succeeded') {
      content = pokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }
  
  return (
    <section className="pokemon-list">
      {filteredPokemons.length > 0 ? (
          filteredPokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)
      ) : (
        content
      )}
    </section>
  )
}
