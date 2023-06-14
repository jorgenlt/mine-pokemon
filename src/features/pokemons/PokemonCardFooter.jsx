import { useDispatch } from 'react-redux'
import { toggleSavePokemon } from './pokemonsSlice'

export default function PokemonCardFooter(props) {
  const dispatch = useDispatch();

  return (
    <footer>
      <div className='card--type'>
        <div className={`icon ${props.type}`}>
          <img src={props.icon} alt='Pokemon type icon' width={100}></img>
        </div>
      </div>
      <div
      className='card--btn' 
      onClick={() => dispatch(toggleSavePokemon({ name: props.name}))}
      >
        <i className={`fa-solid fa-${props.myPokemon ? 'trash' : 'plus'}`}></i>
      </div>
    </footer>
  )
}