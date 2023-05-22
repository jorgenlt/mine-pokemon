import { useEffect, useState } from 'react'
import './styles/app.scss'
import Search from './components/Search'
import Banner from './components/Banner'

function App() {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const limit = 20;
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

  const PokemonData = props => {
    const [pokemonData, setPokemonData] = useState([]);

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
    }, [])

    if (!pokemonData) {
      return <li>Loading...</li>;
    }

    const pokeStats = pokemonData;

    if (pokeStats) {
      const image = pokemonData.sprites?.other?.["official-artwork"]?.["front_default"];
      return (
        <>
          <img src={image} width={150}></img>
          <ul>
            <li>{pokemonData.stats?.[0].base_stat}</li>
            <li>{pokemonData.abilities?.[0].ability.name}</li>
            <li></li>
            <li></li>
          </ul>
        </>
        )
    }
  }

  const cardElements = () => {
    return (
      allPokemon.map(pokemon => {
        // console.log(pokemon.name);
        // const name = pokemon
        // console.log(name);

        return (
        <div className="card" key={pokemon.name}>
          <h1 className="name">{pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}</h1>
          <PokemonData url={pokemon.url} />
        </div>
        )
      })
    )
  }
  
  // allPokemon.length > 0 ? console.log(allPokemon) : console.log('no pokemon');


  return (
    <>
      <main>
        <Banner />
        <Search />
        <div className='cards'>
          {allPokemon ? cardElements() : console.log('theres no pokemon in the list')}
        </div>
      </main>
    </>
  )
}

export default App
