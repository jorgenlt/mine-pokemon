export default function PokemonCardContent(props) {
  
  return (
    <>
      <div className='card--image'>
        <img src={props.image} alt="Pokemon"></img>
      </div>
      <div className='card--abilities'>
        <h3>Ferdigheter</h3>
        <ul>
          {props.abilities && props.abilities.map(element => <li key={element.ability.name}>{element.ability.name}</li>)}
        </ul>
      </div>
    </>
  )
}