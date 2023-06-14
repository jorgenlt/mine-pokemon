import { useEffect, useState } from 'react'
import './styles/app.scss'
import Banner from './components/Banner'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useSelector } from 'react-redux'

import PokemonSearchForm from './features/pokemons/PokemonSearchForm'
import PokemonsList from './features/pokemons/PokemonsList'
import SavedPokemons from './features/pokemons/SavedPokemons'
import { selectSavedPokemons } from './features/pokemons/pokemonsSlice'

export default function App() {
  const [showMyCards, setShowMyCards] = useState(true);

  const savedPokemons = useSelector(selectSavedPokemons);

  // aos, animate on scroll
  useEffect(() => {
    AOS.init();
  }, 
  [])

  return (
    <>
      <main>
        <Banner />
        <PokemonSearchForm />
        {/* {error && <p>{error}</p>} */}
        <hr />
        <div className='myPokemons'>
          <h2>Mine kort</h2>
          <span 
            className="myPokemons--hide" 
            onClick={() => setShowMyCards(prev => !prev)}
          >
            {showMyCards ? 'Skjul kort' : 'Vis kort'}
          </span>
          {showMyCards && <SavedPokemons />}
          {
            savedPokemons.length === 0 &&
            <div className='myPokemons--no-cards'>
              <p>Du har ingen lagrede kort.</p>
              <p>Du kan finne kort i listen under eller ved å søke i søkefeltet.</p>
            </div>
          }
        </div>
        <hr />
        <PokemonsList />
      </main>
    </>
  )
}
