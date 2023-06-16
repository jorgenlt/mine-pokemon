import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'


export default function SavedPokemons() {
  const {savedPokemons} = useSelector(state => state.pokemons);

  const savedPokemonsElements = () => {
    return savedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />);
  }

  return (
    <section className="myPokemons--cards">
      {savedPokemonsElements()}
    </section>
  )
}