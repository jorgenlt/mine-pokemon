// import { selectSavedPokemons } from './pokemonsSlice'
import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'


export default function SavedPokemons() {
  // const savedPokemons = useSelector(selectSavedPokemons);
  const {status, error, savedPokemons} = useSelector(state => state.pokemons);

  let content;

  if (savedPokemons.length > 0) {
    if (status === 'loading') {
      content = <img src="/pikachu.png" className='suspense-loading' alt="pikachu"></img>
    } else if (status === 'succeeded') {
      content = savedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)
    } else if (status === 'failed') {
      content = <div>{error}</div>
    }
  }

  return (
    <section className="myPokemons--cards">
      {content}
    </section>
  )
}