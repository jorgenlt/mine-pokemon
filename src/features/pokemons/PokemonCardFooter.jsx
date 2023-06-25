import { useDispatch, useSelector } from 'react-redux'
import { toggleSavePokemon, updateSearchQuery } from './pokemonsSlice'

export default function PokemonCardFooter(props) {
  const dispatch = useDispatch();
  const {searchQuery} = useSelector(state => state.pokemons);

  /**
   * Dispatches the action to save/delete a Pokemon when the user clicks on the save/delete icon.
   * @func handleSavePokemon
   */
  const handleSavePokemon = () => {
    dispatch(toggleSavePokemon({ id: props.id, changes: {myPokemon: !props.myPokemon} }));
    if (searchQuery) {
      dispatch(updateSearchQuery(searchQuery));
    }
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
      onClick={handleSavePokemon}
      >
        <i className={`fa-solid fa-${props.myPokemon ? 'trash' : 'plus'}`}></i>
      </div>
    </footer>
  )
}