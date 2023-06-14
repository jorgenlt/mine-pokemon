export default function PokemonCardContent(props) {

  const abilitiesList = (abilities) => {
    return (
      abilities.map(element => <li key={element.ability.name}>{element.ability.name}</li>)
    )
  }
  
  return (
    <>
      {props.abilities && (
        <>
          <div className='card--image'>
            <img src={props.image} alt="Pokemon"></img>
          </div>
          <div className='card--abilities'>
            <h3>Ferdigheter</h3>
            <ul>
              {abilitiesList(props.abilities)}
            </ul>
          </div>
        </>
      )}
    </>
  )
}