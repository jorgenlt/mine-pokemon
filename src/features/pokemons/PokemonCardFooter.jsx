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
        {props.myPokemon ? <i className="fa-solid fa-trash"></i> : <i className="fa-solid fa-plus"></i>}
      </div>
    </footer>
  )
}