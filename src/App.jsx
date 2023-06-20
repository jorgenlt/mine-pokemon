import { useEffect } from 'react'
import './styles/app.scss'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from './components/Header'
import PokemonSearch from './features/pokemons/PokemonSearch'
import PokemonsList from './features/pokemons/PokemonsList'
import SavedPokemons from './features/pokemons/SavedPokemons'
import Footer from './components/Footer'
import PokemonSearchResults from './features/pokemons/PokemonSearchResults'

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
        <SavedPokemons />
        <PokemonSearch />
        <PokemonSearchResults />
        <PokemonsList />
        <Footer />
      </main>
    </>
  )
}
