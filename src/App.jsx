import { useEffect, useState, lazy, Suspense } from 'react'
import './styles/app.scss'
const Card = lazy(() => import('./components/Card'))
import Banner from './components/Banner'
import AOS from 'aos'
import { DebounceInput } from 'react-debounce-input'
import 'aos/dist/aos.css'

import PokemonsList from './features/pokemons/PokemonsList'

export default function App() {
  const [allPokemons, setAllPokemons] = useState([]); // global state
  const [query, setQuery] = useState(''); // local state
  const [searchResults, setSearchResults] = useState([]); // local state
  const [myPokemons, setMyPokemons] = useState(
    JSON.parse(localStorage.getItem("myPokemons")) || []
  ); // global state
  const [showMyCards, setShowMyCards] = useState(true); // local state
  const [error, setError] = useState(null); // local state (in api call)

  // aos, animate on scroll
  useEffect(() => {
    AOS.init();
  }, 
  [])

  // save myPokemons to localStorage when it changes. -> save in cached storage
  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));
  }, [myPokemons])


  // API call
  useEffect(() => {
    const limit = 200;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response failed.');
        }
        return response.json()
      })
      .then(data => {
        setAllPokemons(data.results);
        console.log(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('An error occured while fetching pokemons from the API. Please try agian later.');
      });
  }
  ,[])

  // search filter
  useEffect(() => {
    const search = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
      !myPokemons.find(pokemonInList => pokemonInList.name === pokemon.name)
    );
    setSearchResults(search);
  }, [query, allPokemons, myPokemons])


  const addPokemon = pokemon => setMyPokemons(prevPokemons => [...prevPokemons, pokemon]); // slice reducer

  const removePokemon = pokemon => setMyPokemons(prev => prev.filter(item => item !== pokemon)); // slice reducer

  const editPokemonName = (pokemon, newName) => {
    // should be a slice reducer
    setMyPokemons(prev => {
      const updatedPokemons = [...prev];
      const index = updatedPokemons.findIndex(p => p.name === pokemon.name);
      if (index !== -1) {
        updatedPokemons[index] = { ...updatedPokemons[index], name: newName };
      }
      return updatedPokemons;
    });
  }

  const cardElements = pokemons => {
    // excluding pokemons that is already saved
    const filteredPokemons = pokemons.filter(pokemon => !myPokemons.find(p => p.url === pokemon.url));

    return (
      filteredPokemons.map(pokemon => {
        return (
          <Suspense 
            key={pokemon.name} 
            fallback={<img src="/pikachu.png" className='suspense-loading' alt="pikachu"></img>}
          >
            <Card 
              pokemon={pokemon}
              addPokemon={() => addPokemon(pokemon)}
              myPokemon={false}
            />
          </Suspense>
        )
      })
    )
  }

  const myPokemonsElements = myPokemons => {
    if (myPokemons) {
      return (
        myPokemons.map(pokemon => {
          return (
          <Suspense 
            key={pokemon.name} 
            fallback={<img src="/pikachu.png" className='suspense-loading' alt="pikachu"></img>}
          >
            <Card 
              key={pokemon.name}
              pokemon={pokemon}
              removePokemon={() => removePokemon(pokemon)}
              editPokemonName={editPokemonName}
              myPokemon={true}
            />
          </Suspense>
          )
        })
      )
    }
  }

  const handleOnChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <>
      <main>
        <Banner />
        <div className="search--wrapper">
            <form className="search--form" action="">
              <DebounceInput 
                className="search--input" 
                placeholder="🐞 Finn Pokemon i listen under eller søk her." 
                minLength={1}
                debounceTimeout={500}
                value={query}
                type="text" 
                onChange={handleOnChange}
              />
            </form>
        </div>
        {error && <p>{error}</p>}
        <hr />
        <div className='myPokemons'>
          <h2>Mine kort</h2>
          <span className="myPokemons--hide" onClick={() => setShowMyCards(prev => !prev)}>{showMyCards ? 'Skjul kort' : 'Vis kort'}</span>
          { 
            showMyCards &&
            <div className='myPokemons--cards'>
              {myPokemons && myPokemonsElements(myPokemons)}
            </div>
          }
          {
            myPokemons.length < 1 &&
            <div className='myPokemons--no-cards'>
              <p>Du har ingen lagrede kort.</p>
              <p>Du kan finne kort i listen under eller ved å søke i søkefeltet.</p>
            </div>
          }
        </div>

        <hr />
          <PokemonsList />
        <hr />

        <hr />
        <div className='pokemon-list'>
          {query ? cardElements(searchResults) : cardElements(allPokemons)}
        </div>
      </main>
    </>
  )
}
