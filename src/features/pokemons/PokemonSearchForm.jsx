import { TYPESLIST } from '../../common/utils/constants/TYPESLIST'
import { ABILITIESLIST } from '../../common/utils/constants/ABILITIESLIST'
import { DebounceInput } from 'react-debounce-input';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateSearchQuery, 
  updateTypeFilter, 
  updateAbilityFilter 
} from './pokemonsSlice';
import { updateSortBy } from './pokemonsSlice';

export default function PokemonSearchForm() {
  const query = useSelector(state => state.searchQuery);
  const typeFilter = useSelector(state => state.typeFilter);
  const abilityFilter = useSelector(state => state.abilityFilter);
  
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
    dispatch(updateSortBy('name'));
  };

  const handleSortByHP = () => {
    dispatch(updateSortBy('hp'));
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
        <button className='search--sort-by' type='button' onClick={handleSortByName}>Sorter på navn</button>
        <button className='search--sort-by' type='button' onClick={handleSortByHP}>Sorter på HP</button>
      </form>
    </div>
  );
}
