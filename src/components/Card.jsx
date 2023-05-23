import { useState, useEffect} from 'react'

export default function Card(props) {
    // console.log(props.pokemon.url);

    const [pokemonData, setPokemonData] = useState();
    const url = props.pokemon.url;

    useEffect(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          setPokemonData(data)
        })
        .catch(error => {
          console.log(error);
        });
    }, [])
    
    if (pokemonData) {
        pokemonData.abilities.forEach((element) => console.log(element.ability.name))
        
        // console.log(pokemonData.abilities);
    }

    // if (!pokemonData) {
    //   return <li>Loading...</li>;
    // }

    let image;
    let hp;
    let abilities;

    if (pokemonData) {
        image = pokemonData.sprites.other['official-artwork']["front_default"];
        hp = pokemonData.stats[0].base_stat;
        abilities = pokemonData.abilities;
    }

    return (
        <div 
            className="card" 
            key={props.pokemon.name}
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="400"
        >
            <div className='card--header'>
                <h1 className="card--title">{props.pokemon.name}</h1>
                <span className='card--hp'>{hp}</span>
            </div>
            <div className='card--image'>
                <img src={image}></img>
            </div>
            <div className='card--abilities'>
                <ul>
                    {abilities && abilities.map(element => <li key={element.ability.name}>{element.ability.name}</li>)}
                </ul>
            </div>

            <button
                // onClick={() => addPokemon(pokemon)}
                onClick={props.addPokemon}
            >
                Legg til i liste
            </button>
        </div>
    )
}