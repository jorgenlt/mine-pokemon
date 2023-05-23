import { useEffect, useState } from 'react'
import './styles/app.scss'
// import Search from './components/Search'
import Banner from './components/Banner'

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchresults] = useState([]);
  const [myPokemon, setMyPokemon] = useState([]);

  useEffect(() => {
    const limit = 50;
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

  const PokemonData = props => {
    const [pokemonData, setPokemonData] = useState();

    useEffect(() => {
      fetch(props.url)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          setPokemonData(data)
        })
        .catch(error => {
          console.log(error);
        });
    }, [props.url])

    if (!pokemonData) {
      return <li>Loading...</li>;
    }

    const image = pokemonData.sprites?.other?.["official-artwork"]?.["front_default"];
    const hp = pokemonData.stats?.[0].base_stat;
    
    const ability1 = pokemonData.abilities?.[0].ability?.name;
    let ability2 = false;
    if (pokemonData.abilities?.[1]) {
      ability2 = pokemonData.abilities?.[1].ability?.name;
      // console.log(ability2);
    }

    return (
      <>
        <img src={image} width={150}></img>
        <ul>
          <li>{hp}</li>
          <li>{ability1}</li>
          {ability2 && <li>{ability2}</li>}
          <li></li>
          <li></li>
        </ul>
      </>
    )
  }

  // const addPokemon = pokemon => {
  //   setMyPokemon([
  //     ...myPokemon,
  //     pokemon
  //   ])
  //   console.log(myPokemon);
  // }

  const cardElements = (pokemon) => {
    
    return (
      pokemon.map(pokemon => {
        return (
          <div className="card" key={pokemon.name}>
            <h1 className="name">{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}</h1>
            <PokemonData url={pokemon.url} />
            <button
              // onClick={() => addPokemon(pokemon)}
              onClick={() => myPokemon.includes(pokemon) ? console.log('Pokemon already exists.') : setMyPokemon([...myPokemon, pokemon])}
            >
              Legg til i liste
            </button>
          </div>
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
            <div className="card" key={pokemon.name}>
              <h1 className="name">{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`}</h1>
              <PokemonData url={pokemon.url} />
              <button
                onClick={() => setMyPokemon(prev => prev.filter(item => item !== pokemon))}
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
