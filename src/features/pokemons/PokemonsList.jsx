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
  } = useSelector(state => state.pokemons);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPokemonsThunk());
    }
  },[status, dispatch])

  const handleRetry = () => {
    dispatch(fetchPokemonsThunk())
  }

  let pokemonElements;

  if (status === 'loading') {
    pokemonElements = <Loader />
  } else if (status === 'succeeded') {
      pokemonElements = pokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
  } else if (status === 'failed') {
    pokemonElements = (
      <div>
        <p>{error}</p>
        <button
          className='button'
          onClick={handleRetry}
        >
          Try again
        </button>
      </div>
    )
  }
  
  return (
    <section className='all-pokemons'>
      <h2>Alle Pokémon</h2>
      <div className="pokemon-list">
        {pokemonElements}
      </div>
    </section>
  )
}
