import { useEffect } from 'react'
import './styles/app.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header'
import PokemonSearchForm from './features/pokemons/PokemonSearchForm'
import PokemonsList from './features/pokemons/PokemonsList'
import SavedPokemons from './features/pokemons/SavedPokemons'
import Footer from './components/Footer'

export default function App() {

  // aos, animate on scroll
  useEffect(() => {
    AOS.init();
  }, 
  [])

  return (
    <>
      <main>
        <Header />
        {/* {error && <p>{error}</p>} */}
        <hr />
        <SavedPokemons />
        <hr />
        <PokemonSearchForm />
        <PokemonsList />
        <Footer />
      </main>
    </>
  )
}
