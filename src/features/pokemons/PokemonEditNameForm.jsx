import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePokemonName } from './pokemonsSlice'

export default function PokemonEditNameForm(props) {
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const dispatch = useDispatch();

  const toggleEditNameForm = () => setEditNameOpen(prev => !prev);

  const handleOnClick = () => {
    dispatch(updatePokemonName({ id: props.id, changes: {name: newName} }));
    setEditNameOpen(!editNameOpen);
    setNewName('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleOnClick();
    }
  };

  return (
    <>
      <i onClick={toggleEditNameForm} className="fa-solid fa-pen"></i>
      {
        editNameOpen && 
        <div className='card--edit-name'>
          <form>
            <input
            type="text" 
            placeholder={props.name}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={handleKeyDown}
            />
            <button
              type='button' 
              className='button' 
              onClick={handleOnClick} 
            >
              Lagre
            </button>
          </form>
        </div>
      }
    </>
  )
}