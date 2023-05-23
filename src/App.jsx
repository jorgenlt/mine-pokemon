import { useEffect, useState } from 'react'
import './styles/app.scss'
// import Search from './components/Search'
import Card from './components/Card'
import Banner from './components/Banner'
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchresults] = useState([]);
  const [myPokemon, setMyPokemon] = useState([]);

  // Animate On Scroll
  useEffect(() => {
    AOS.init();
  }, 
  []);

  useEffect(() => {
    const limit = 40;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setAllPokemon(data.results);
        // console.log(data.results[0].name);
      })
      .catch(error => {
        console.log(error);
      });
    }
  ,[])

  useEffect(() => {
    const search = allPokemon.filter(pokemon =>
      pokemon.name.includes(query.toLowerCase())
    );
    setSearchresults(search);
  }, [query]);

  // const PokemonData = props => {
  //   const [pokemonData, setPokemonData] = useState();

  //   useEffect(() => {
  //     fetch(props.url)
  //       .then(response => response.json())
  //       .then(data => {
  //         // console.log(data);
  //         setPokemonData(data)
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }, [props.url])

  //   if (!pokemonData) {
  //     return <li>Loading...</li>;
  //   }

  //   const image = pokemonData.sprites?.other?.["official-artwork"]?.["front_default"];
  //   const hp = pokemonData.stats?.[0].base_stat;
    
  //   const ability1 = pokemonData.abilities?.[0].ability?.name;
  //   let ability2 = false;
  //   if (pokemonData.abilities?.[1]) {
  //     ability2 = pokemonData.abilities?.[1].ability?.name;
  //     // console.log(ability2);
  //   }

  //   return (
  //     <>
  //       <img src={image} width={150}></img>
  //       <ul>
  //         <li>{hp}</li>
  //         <li>{ability1}</li>
  //         {ability2 && <li>{ability2}</li>}
  //         <li></li>
  //         <li></li>
  //       </ul>
  //     </>
  //   )
  // }

  // const addPokemon = pokemon => {
  //   setMyPokemon([
  //     ...myPokemon,
  //     pokemon
  //   ])
  //   console.log(myPokemon);
  // }

  const addPokemon = pokemon => {
    if (myPokemon.includes(pokemon)) {
      console.log('Pokemon already exists.')
    } else {
      setMyPokemon([...myPokemon, pokemon])
    }
  }

  const removePokemon = pokemon => {
    setMyPokemon(prev => prev.filter(item => item !== pokemon))
  }

  const cardElements = (pokemon) => {
    return (
      pokemon.map(pokemon => {
        return (
          <Card 
            key={pokemon.name}
            pokemon={pokemon}
            addPokemon={addPokemon}
          />
        )
      })
    )
  }

  // const deletePokemon = pokemon => {
  //   setMyPokemon(prev => prev.filter(item => item !== pokemon));
  // };

  const listElements = myListedPokemon => {
    if (myListedPokemon) {
      return (
        myListedPokemon.map(pokemon => {
          return (
            <div>
              <Card 
                key={pokemon.name}
                pokemon={pokemon}
                removePokemon={removePokemon}
              />

              <button
                onClick={() => removePokemon(pokemon)}
              >
                Fjern
              </button>
            </div>
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
                <input 
                    className="search--input" 
                    placeholder="Finn pokemon..." 
                    value={query}
                    type="text" 
                    onChange={handleOnChange}
                />
                <button className="search--btn">Finn pokemon!</button>
            </form>
        </div>
        <p>myPokemon.length:{myPokemon.length}</p>
        <div className='list'>
          {myPokemon && listElements(myPokemon)}
        </div>
        <div className='cards'>
          {query ? cardElements(searchResults) : cardElements(allPokemon)}
        </div>
      </main>
    </>
  )
}

export default App
