import PokemonCardHeader from './PokemonCardHeader'
import PokemonCardContent from './PokemonCardContent'
import PokemonCardFooter from './PokemonCardFooter'

export default function PokemonCard(props) {

  const {
    name,
    id, 
    image, 
    type, 
    backgroundColor, 
    hp, 
    abilities,
    icon,
    myPokemon
  } = props.pokemon;

  return (
    <div 
      className="card" 
      data-aos="zoom-out"
      data-aos-offset="100"
      data-aos-delay="50"
      data-aos-duration="400"
      style={{background: backgroundColor}}
    >
      <PokemonCardHeader 
        name={name} 
        id={id}
        hp={hp} 
        myPokemon={myPokemon}
      />
      <PokemonCardContent image={image} abilities={abilities} />
      <PokemonCardFooter 
        id={id} 
        type={type} 
        icon={icon}
        myPokemon={myPokemon}
      />
    </div>
  )
}