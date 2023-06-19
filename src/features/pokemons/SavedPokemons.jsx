import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'
import { selectSavedPokemons } from './pokemonsSlice'

export default function SavedPokemons() {
  const savedPokemons = useSelector(selectSavedPokemons);

  const savedPokemonsElements = () => {
    return savedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />);
  }

  return (
    <section className="myPokemons--cards">
      {savedPokemonsElements()}
    </section>
  )
}