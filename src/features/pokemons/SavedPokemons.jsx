import { useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'
import { selectSavedPokemons } from './pokemonsSlice'

export default function SavedPokemons() {
  const [showMyCards, setShowMyCards] = useState(true);
  const savedPokemons = useSelector(selectSavedPokemons);

  const savedPokemonsElements = () => {
    return savedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />);
  }

  return (
    <section className='saved-pokemons'>
        <h2>Mine Pokemón kort</h2>
        {
          (showMyCards && savedPokemons.length > 0) &&
          <div className="saved-pokemons--cards">
            {savedPokemonsElements()}
          </div>
        }
        {
          savedPokemons.length === 0 ? (
          <div className='saved-pokemons--no-cards'>
            <p>Du har ingen lagrede kort.</p>
            <p>Du kan finne kort i listen under eller ved å søke i søkefeltet.</p>
          </div>
          ) : (
          <button 
            className="saved-pokemons--hide button" 
            onClick={() => setShowMyCards(prev => !prev)}
          >
            {showMyCards ? 'Skjul kort' : 'Vis kort'}
          </button>
          )
        }
    </section>
  )
}