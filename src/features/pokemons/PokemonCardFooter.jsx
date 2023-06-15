import { useDispatch, useSelector } from 'react-redux'
import { toggleSavePokemon, updateSearchQuery } from './pokemonsSlice'

export default function PokemonCardFooter(props) {
  const dispatch = useDispatch();
  const query = useSelector(state => state.pokemons.searchQuery);

  const handleOnClick = () => {
    dispatch(toggleSavePokemon({ id: props.id}));
    dispatch(updateSearchQuery({ query: query }))
  }

  return (
    <footer>
      <div className='card--type'>
        <div className={`icon ${props.type}`}>
          <img src={props.icon} alt='Pokemon type icon' width={100}></img>
        </div>
      </div>
      <div
      className='card--btn' 
      onClick={handleOnClick}
      >
        <i className={`fa-solid fa-${props.myPokemon ? 'trash' : 'plus'}`}></i>
      </div>
    </footer>
  )
}