import { TYPESLIST } from '../../common/utils/constants/TYPESLIST'
import { ABILITIESLIST } from '../../common/utils/constants/ABILITIESLIST'
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import { 
  updateSearchQuery, 
  updateTypeFilter, 
  updateAbilityFilter 
} from './pokemonsSlice';
import { updateSortBy } from './pokemonsSlice';

export default function PokemonSearch() {
  const {typeFilter, abilityFilter} = useSelector(state => state.pokemons);
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  const dispatch = useDispatch();

  /**
   * Dispatches the action to update the search query and performs the search.
   * @param {Object} e - The event to get the value in the form.
   */
  const handleOnChange = e => {
    dispatch(updateSearchQuery(e.target.value));
    setInput(e.target.value);
  };

  /**
   * Dispatches the action to update type filter and performs the filtering by type. 
   * @param {Object} e - The event to get the value from the selected type. 
   */
  const handleTypeFilterChange = e => {
    dispatch(updateTypeFilter(e.target.value));
  };

  /**
   * Dispatches the action to update ability filter and performs the filtering by ability. 
   * @param {Object} e - The event to get the value from the selected ability. 
   */
  const handleAbilityFilterChange = e => {
    dispatch(updateAbilityFilter(e.target.value));
  };

  /**
   * Dispatches the action to sort alphabetically.
   */
  const handleSortByName = () => {
    dispatch(updateSortBy('name'));
    setSortBy('name');
  };

  /**
   * Dispatches the action to sort by HP(high to low).
   */
  const handleSortByHP = () => {
    dispatch(updateSortBy('hp'));
    setSortBy('hp');
  };

  /**
   * Dispatches actions to reset all the filters.
   */
  const handleResetFilters = () => {
    dispatch(updateSearchQuery(''));
    dispatch(updateTypeFilter(''));
    dispatch(updateAbilityFilter(''));
    dispatch(updateSortBy(''));
    dispatch(updateSortBy(''));
    setInput('');
    setSortBy('');
  }

  /**
   * Prevents the default submitting of the form if the user presses Enter. 
   */
  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <section className="search">
      <h2>Søkefilter</h2>
      <form className="search--form" action="">
        <DebounceInput 
          className="search--input" 
          placeholder="🐞 Finn Pokemon i listen under eller søk her" 
          minLength={0}
          debounceTimeout={400}
          value={input}
          type="text" 
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
        />
      </form>
      <form className='search--advanced'>
        <select
          className="search--filter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        >
          {TYPESLIST.map(type => (
            <option key={type} value={type}>
              {type ? type : 'Type'}
            </option>
          ))}
        </select>
        <select
          className="search--filter"
          value={abilityFilter}
          onChange={handleAbilityFilterChange}
        >
          {ABILITIESLIST.map(ability => (
            <option key={ability} value={ability}>
              {ability ? ability : 'Evne'}
            </option>
          ))}
        </select>
        <button 
          className={sortBy === 'name' ? 'button--chosen' : 'button--sort'}
          type='button' 
          onClick={handleSortByName}
        >
          Sorter på navn
        </button>
        <button 
          className={sortBy === 'hp' ? 'button--chosen' : 'button--sort'}
          type='button' 
          onClick={handleSortByHP}
        >
          Sorter på HP
        </button>
        <button 
          className='button' 
          type='button' 
          onClick={handleResetFilters}
        >
          Reset
        </button>
      </form>
    </section>
  );
}