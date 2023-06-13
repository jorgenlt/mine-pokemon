import { selectSavedPokemons } from './pokemonsSlice'
import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'

export default function SavedPokemons() {
  const savedPokemons = useSelector(selectSavedPokemons);
  const pokemonStatus = useSelector(state => state.pokemons.status);
  const error = useSelector(state => state.pokemons.error)

  let content;

  if (savedPokemons.length > 0) {
    if (pokemonStatus === 'loading') {
      content = <img src="/pikachu.png" className='suspense-loading' alt="pikachu"></img>
    } else if (pokemonStatus === 'succeeded') {
      content = savedPokemons.map(pokemon => <PokemonCard key={pokemon.name} pokemon={pokemon} />)
    } else if (pokemonStatus === 'failed') {
      content = <div>{error}</div>
    }
  }

  return (
    <section className="pokemon-list">
      {content}
    </section>
  )
}