import { useEffect, useState } from 'react'
import './styles/app.scss'
import Search from './components/Search'
import Banner from './components/Banner'

function App() {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setAllPokemon(data.results);
      })
      .catch(error => {
        console.log(error);
      });
  }, [])

  return (
    <>
      <main>
        <Banner />
        <Search />
        <h1>test</h1>
      </main>
    </>
  )
}

export default App
