import { DebounceInput } from 'react-debounce-input'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { updateFilteredPokemons } from './pokemonsSlice'

export default function PokemonSearchForm() {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch()

  const handleOnChange = e => {
    setQuery(e.target.value);
    dispatch(updateFilteredPokemons({ query: e.target.value}));
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