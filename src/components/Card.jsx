import { useState, useEffect} from 'react'
import { TYPEDATA } from '../utils/constants/TYPEDATA'

export default function Card(props) {
    const [pokemonData, setPokemonData] = useState();
    const [editNameOpen, setEditNameOpen] = useState(false);
    const [nameInputValue, setNameInputValue] = useState('');
    const [imageLoading, setImageLoading] = useState(true);

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

    // pokemon card data
    let image;
    let hp;
    let abilities;
    let type;
    let backgroundColor;
    let icon;

    if (pokemonData) {
        image = pokemonData.sprites.other['dream_world']["front_default"];
        hp = pokemonData.stats[0].base_stat;
        abilities = pokemonData.abilities;
        type = pokemonData.types[0].type.name;
        backgroundColor = TYPEDATA[type].background;
        icon = TYPEDATA[type].icon;
    }

    // edit name
    const toggleEditName = () => {
        setEditNameOpen(prev => !prev);
    }

    const handleNameInputChange = (event) => {
        setNameInputValue(event.target.value);
        console.log(nameInputValue);
    }

    const handleSubmitName = () => {
        props.editPokemonName(props.pokemon, nameInputValue);
    }

    // image loading skeleton
    useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
        setImageLoading(false);
    }

    return () => {
        img.onload = null;
    };
    }, [image]);

    return (
        <div 
            className="card" 
            key={props.pokemon.name}
            data-aos="zoom-out"
            data-aos-offset="100"
            data-aos-delay="50"
            data-aos-duration="400"
            style={{background: backgroundColor}}
        >
            <div className='card--header'>
                <div className="card--title">
                    <h1>{props.pokemon.name}</h1>
                    {props.myPokemon && <i onClick={toggleEditName} className="fa-solid fa-pen"></i>}
                    {
                        editNameOpen && 
                        <div className='card--edit-name'>
                            <form>
                                <input 
                                    type="text" 
                                    placeholder='Nytt navn...'
                                    value={nameInputValue}
                                    onChange={handleNameInputChange}
                                />
                                <button onClick={handleSubmitName} >Lagre</button>
                            </form>
                        </div>
                    }
                </div>
                <span className='card--hp'>{hp}</span>
            </div>
            <div className={`card--image ${imageLoading ? 'loading' : ''}`}>
            {
                imageLoading ? (
                    <div className="skeleton"></div>
                ) : (
                    <img src={image} alt="Pokemon"></img>
                )
            }
            </div>
            {   
                !imageLoading &&
                <div className='card--abilities'>
                    <h3>Ferdigheter</h3>
                    <ul>
                        {abilities && abilities.map(element => <li key={element.ability.name}>{element.ability.name}</li>)}
                    </ul>
                </div>
            }
            <div className='card--type'>
                <div className={`icon ${type}`}>
                    {!imageLoading && <img src={icon} width={100}></img>}
                </div>
            </div>
            <div
                className='card--btn' 
                onClick={props.myPokemon ? props.removePokemon : props.addPokemon}
            >
                    {props.myPokemon ? <i className="fa-solid fa-trash"></i> : <i className="fa-solid fa-plus"></i>}

            </div>

        </div>
    )
}