import { useEffect, useState, lazy, Suspense } from 'react'
import './styles/app.scss'
// import Search from './components/Search'
// import Card from './components/Card'
const Card = lazy(() => import('./components/Card'));
import Banner from './components/Banner'
import AOS from 'aos';
import { DebounceInput } from 'react-debounce-input';
import 'aos/dist/aos.css';

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [myPokemons, setMyPokemons] = useState(
    JSON.parse(localStorage.getItem("myPokemons")) || []
  );

  // Animate On Scroll
  useEffect(() => {
    AOS.init();
  }, 
  []);

  // Save myPokemons to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("myPokemons", JSON.stringify(myPokemons))
  }, [myPokemons])


  // API call
  useEffect(() => {
    const limit = 200;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAllPokemons(data.results);
      })
      .catch(error => {
        console.log(error);
      });
    }
  ,[])

  //Search filter
  useEffect(() => {
    const search = allPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(query.toLowerCase()) &&
      !myPokemons.find(pokemonInList => pokemonInList.name === pokemon.name)
    );
    setSearchResults(search);
  }, [query, allPokemons, myPokemons]);


  const addPokemon = pokemon => {
    if (myPokemons.includes(pokemon)) {
      console.log('Pokemon already exists.')
    } else {
      setMyPokemons(prevPokemons => [...prevPokemons, pokemon])
    }
  }

  const removePokemon = pokemon => {
    setMyPokemons(prev => prev.filter(item => item !== pokemon))
  }

  const editPokemonName = (pokemon, newName) => {
    setMyPokemons(prev => {
      const updatedPokemons = [...prev];
      const index = updatedPokemons.findIndex(p => p.name === pokemon.name);
      if (index !== -1) {
        updatedPokemons[index] = { ...updatedPokemons[index], name: newName };
      }
      return updatedPokemons;
    });
  }

  const cardElements = (pokemons) => {
    // Excluding pokemons that is already saved
    const filteredPokemons = pokemons.filter(pokemon => !myPokemons.find(p => p.url === pokemon.url));

    return (
      filteredPokemons.map(pokemon => {
        return (
          <Suspense key={pokemon.name} fallback={<div>Loading...</div>}>
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
            <Card 
              key={pokemon.name}
              pokemon={pokemon}
              removePokemon={() => removePokemon(pokemon)}
              editPokemonName={editPokemonName}
              myPokemon={true}
            />
          )
        })
      )
    }
  }

  const handleOnChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <main>
        <Banner />
        <div className="search--wrapper">
            <form className="search--form" action="">
                <DebounceInput 
                    className="search--input" 
                    placeholder="👉 Finn Pokemon i listen under eller søk her." 
                    minLength={1}
                    debounceTimeout={500}
                    value={query}
                    type="text" 
                    onChange={handleOnChange}
                />
            </form>
        </div>
        <div className='myPokemons'>
          <h2>Min liste</h2>
          <div className='myPokemons--cards'>
            {myPokemons && myPokemonsElements(myPokemons)}
          </div>
        </div>
        <div className='cards'>
        {query ? cardElements(searchResults) : cardElements(allPokemons)}
        </div>
      </main>
    </>
  )
}

export default App
