import PokemonEditNameForm from './PokemonEditNameForm'

export default function PokemonCardHeader(props) {
  return (
    <header className='card--header'>
      <div className="card--title">
        <h1>{props.name}</h1>
        {props.myPokemon && <PokemonEditNameForm name={props.name} />}
      </div>
      <span className='card--hp'>{props.hp}</span>
    </header>
    )
  }