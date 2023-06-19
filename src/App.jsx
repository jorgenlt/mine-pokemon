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

  // aos, animate on scroll
  useEffect(() => {
    AOS.init();
  }, 
  [])

  return (
    <>
      <main>
        <Banner />
        {/* {error && <p>{error}</p>} */}
        <hr />
        <SavedPokemons />
        <hr />
        <PokemonSearchForm />
        <PokemonsList />
      </main>
    </>
  )
}
