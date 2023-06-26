import { TYPES_LIST } from '../../common/utils/constants/TYPES_LIST'
import { ABILITIES_LIST } from '../../common/utils/constants/ABILITIES_LIST'
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
   * @func handleQueryChange
   * @param {Object} event - The event to get the value in the form.
   */
  const handleQueryChange = event => {
    dispatch(updateSearchQuery(event.target.value));
    setInput(event.target.value);
  };

  /**
   * Dispatches the action to update type filter and performs the filtering by type.
   * @func handleTypeFilterChange 
   * @param {Object} event - The event to get the value from the selected type. 
   */
  const handleTypeFilterChange = event => {
    dispatch(updateTypeFilter(event.target.value));
  };

  /**
   * Dispatches the action to update ability filter and performs the filtering by ability.
   * @func handleAbilityFilterChange
   * @param {Object} event - The event to get the value from the selected ability. 
   */
  const handleAbilityFilterChange = event => {
    dispatch(updateAbilityFilter(event.target.value));
  };

  /**
   * Dispatches the action to sort alphabetically.
   * @func handleSortByName
   */
  const handleSortByName = () => {
    dispatch(updateSortBy('name'));
    setSortBy('name');
  };

  /**
   * Dispatches the action to sort by HP(high to low).
   * @func handleSortByHP
   */
  const handleSortByHP = () => {
    dispatch(updateSortBy('hp'));
    setSortBy('hp');
  };

  /**
   * Dispatches actions to reset all the filters.
   * @func handleResetFilters
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
   * @func handleOnKeyDownSearchForm
   */
  const handleOnKeyDownSearchForm = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <section className="search">
      <h2>Search filters</h2>
      <form className="search--form" action="">
        <DebounceInput 
          className="search--input" 
          placeholder="🐞 Type to search for a Pokémon." 
          minLength={0}
          debounceTimeout={400}
          value={input}
          type="text" 
          onChange={handleQueryChange}
          onKeyDown={handleOnKeyDownSearchForm}
        />
      </form>
      <form className='search--advanced'>
        <select
          className="search--filter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        >
          {TYPES_LIST.map(type => (
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
          {ABILITIES_LIST.map(ability => (
            <option key={ability} value={ability}>
              {ability ? ability : 'Ability'}
            </option>
          ))}
        </select>
        <button 
          className={sortBy === 'name' ? 'button--chosen' : 'button--sort'}
          type='button' 
          onClick={handleSortByName}
        >
          Sort by name
        </button>
        <button 
          className={sortBy === 'hp' ? 'button--chosen' : 'button--sort'}
          type='button' 
          onClick={handleSortByHP}
        >
          Sorter by HP
        </button>
        <button 
          className='button' 
          type='button' 
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      </form>
    </section>
  );
}
