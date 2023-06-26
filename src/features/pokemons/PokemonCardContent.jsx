export default function PokemonCardContent(props) {
  /**
   * Creates the JSX elements of the Pokemon's abilities
   * @func abilitiesElements
   * @param {Object} abilities - Containg data on the Pokemon's abilities.
   * @returns {Array} - Containing JSX elements with the Pokemon's abilities.
   */
  const abilitiesElements = (abilities) => {
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
            <h3>Abilities</h3>
            <ul>
              {abilitiesElements(props.abilities)}
            </ul>
          </div>
        </>
      )}
    </>
  )
}