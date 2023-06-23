export default function PokemonCardContent(props) {
  /**
   * 
   * @param {Object} abilities - Containg data on the Pokemon's abilities.
   * @returns {Array} - Containing JSX elements with the Pokemon's abilities.
   */
  const ABILITIES_LIST = (abilities) => {
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
            <h3>Evner</h3>
            <ul>
              {ABILITIES_LIST(props.abilities)}
            </ul>
          </div>
        </>
      )}
    </>
  )
}