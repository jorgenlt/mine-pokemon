import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePokemonName } from './pokemonsSlice'

export default function PokemonEditNameForm(props) {
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const dispatch = useDispatch();

  /**
   * Sets the local state to show/hide the edit name form.
   * @func toggleEditNameForm
   */
  const toggleEditNameForm = () => setEditNameOpen(prev => !prev);

  /**
   * Dispatches action for updating the Pokemon's name.
   * @func handleSubmitNewName
   */
  const handleSubmitNewName = () => {
    dispatch(updatePokemonName({ id: props.id, changes: {name: newName} }));
    setEditNameOpen(!editNameOpen);
    setNewName('');
  }

  /**
   * Handles when the user presses Enter instead of "Save" button.
   * Prevents the default action of submitting the form, causing a refresh.
   * @func handleKeyDownNameForm
   */
  const handleKeyDownNameForm = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmitNewName();
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
            onKeyDown={handleKeyDownNameForm}
            />
            <button
              type='button' 
              className='button' 
              onClick={handleSubmitNewName} 
            >
              Lagre
            </button>
          </form>
        </div>
      }
    </>
  )
}