import { DebounceInput } from 'react-debounce-input'
import { useDispatch, useSelector } from 'react-redux'
import { updateSearchQuery } from './pokemonsSlice'

export default function PokemonSearchForm() {
  const query = useSelector(state => state.searchQuery);

  const dispatch = useDispatch()

  const handleOnChange = e => {
    dispatch(updateSearchQuery({ query: e.target.value }))
  }

  return (
    <div className="search--wrapper">
      <form className="search--form" action="">
        <DebounceInput 
          className="search--input" 
          placeholder="🐞 Finn Pokemon i listen under eller søk her." 
          minLength={0}
          debounceTimeout={400}
          value={query}
          type="text" 
          onChange={e => handleOnChange(e)}
        />
      </form>
    </div>
  )
}