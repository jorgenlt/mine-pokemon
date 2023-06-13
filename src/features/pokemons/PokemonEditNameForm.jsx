import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePokemonName } from './pokemonsSlice'

export default function PokemonEditNameForm(props) {
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [newName, setNewName] = useState('');

  const dispatch = useDispatch();

  const toggleEditNameForm = () => setEditNameOpen(prev => !prev);

  const handleSubmitName = () => {
    dispatch(updatePokemonName({ name: props.name, newName: newName }))
  }

  return (
    <>
      <i onClick={toggleEditNameForm} className="fa-solid fa-pen"></i>
      {
        editNameOpen && 
        <div className='card--edit-name'>
          <form>
            <input 
            type="text" 
            placeholder='Nytt navn...'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleSubmitName} >Lagre</button>
          </form>
        </div>
      }
    </>
  )
}