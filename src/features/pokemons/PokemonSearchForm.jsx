import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchQuery, updateTypeFilter, updateAbilityFilter } from './pokemonsSlice';
import { TYPES } from '../../common/utils/constants/TYPES'
import { ABILITIES } from '../../common/utils/constants/ABILITIES'

// Import the new action creator
import { updateSortBy } from './pokemonsSlice';

export default function PokemonSearchForm() {
  const query = useSelector(state => state.searchQuery);
  const typeFilter = useSelector(state => state.typeFilter);
  const abilityFilter = useSelector(state => state.abilityFilter);
  const sortBy = useSelector(state => state.sortBy); // Add the sortBy selector

  const dispatch = useDispatch();

  const handleOnChange = e => {
    dispatch(updateSearchQuery(e.target.value));
  };

  const handleTypeFilterChange = e => {
    dispatch(updateTypeFilter(e.target.value));
  };

  const handleAbilityFilterChange = e => {
    dispatch(updateAbilityFilter(e.target.value));
  };

  const handleSortByName = () => {
    dispatch(updateSortBy('name')); // Dispatch the action to update the sortBy state
  };

  const handleSortByHP = () => {
    dispatch(updateSortBy('hp')); // Dispatch the action to update the sortBy state
  };

  return (
    <div className="search--wrapper">
      <form className="search--form" action="">
        <DebounceInput 
          className="search--input" 
          placeholder="🐞 Find Pokemon in the list below or search here." 
          minLength={0}
          debounceTimeout={400}
          value={query}
          type="text" 
          onChange={handleOnChange}
        />
      </form>
      <form>
        <select
          className="search--filter"
          value={typeFilter}
          onChange={handleTypeFilterChange}
        >
          {TYPES.map(type => (
            <option key={type} value={type}>
              {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Type'}
            </option>
          ))}
        </select>
        <select
          className="search--filter"
          value={abilityFilter}
          onChange={handleAbilityFilterChange}
        >
          {ABILITIES.map(ability => (
            <option key={ability} value={ability}>
              {ability ? ability : 'Ferdighet'}
            </option>
          ))}
        </select>
        <button type='button' onClick={handleSortByName}>Sorter på navn</button>
        <button type='button' onClick={handleSortByHP}>Sorter på HP</button>
      </form>
    </div>
  );
}
