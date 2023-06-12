import { useState, useEffect} from 'react'
import { TYPEDATA } from '../utils/constants/TYPEDATA'

export default function Card(props) {
    const [pokemonData, setPokemonData] = useState(null); // global state
    const [editNameOpen, setEditNameOpen] = useState(false); // local state
    const [nameInputValue, setNameInputValue] = useState(''); // local state
    const [imageLoading, setImageLoading] = useState(true); // local state
    const [error, setError] = useState(null); // local state (in api call)

    const url = props.pokemon.url;

    // Card.jsx does should be split up into components.

    // API call Pokemon card data
    useEffect(() => {
      fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response failed.')
            }
            return response.json()
        })
        .then(data => {
          setPokemonData(data)
          setError(null);
        })
        .catch(error => {
          console.error('Error:', error);
          setError('An error occured while fetching the Pokemon card data from the API. Please try again later.')
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
    const toggleEditName = () => setEditNameOpen(prev => !prev);
    const handleNameInputChange = event => setNameInputValue(event.target.value);
    const handleSubmitName = () => props.editPokemonName(props.pokemon, nameInputValue);

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
            {error && <p className='card--error'>{error}</p>}
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
                    {!imageLoading && <img src={icon} alt='Pokemon type icon' width={100}></img>}
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