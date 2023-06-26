import { useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from './PokemonCard'
import { selectSavedPokemons } from './pokemonsSlice'

export default function SavedPokemons() {
  const [showMyCards, setShowMyCards] = useState(true);
  const savedPokemons = useSelector(selectSavedPokemons);

  /**
   * Renders the saved Pokemon cards.
   * @func savedPokemonsElements
   * @returns {JSX.Element[]} The array of rendered Pokemon cards.
   */
  const savedPokemonsElements = () => {
    return savedPokemons.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />);
  }

  return (
    <section className='saved-pokemons'>
        <h2>My Pokémon cards</h2>
        {
          (showMyCards && savedPokemons.length > 0) &&
          <div className="saved-pokemons--cards">
            {savedPokemonsElements()}
          </div>
        }
        {
          savedPokemons.length === 0 ? (
          <div className='saved-pokemons--no-cards'>
            <p>You have no saved cards.</p>
            <p>Find a Pokémon in the list or make a search.</p>
          </div>
          ) : (
          <button 
            className="saved-pokemons--hide button" 
            onClick={() => setShowMyCards(prev => !prev)}
          >
            {showMyCards ? 'Hide cards' : 'Show cards'}
          </button>
          )
        }
    </section>
  )
}