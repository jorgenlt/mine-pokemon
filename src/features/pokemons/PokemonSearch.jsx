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
  const typeFilter = useSelector(state => state.typeFilter);
  const abilityFilter = useSelector(state => state.abilityFilter);
  const [input, setInput] = useState('');
  const [sortBy, setSortBy] = useState('');
  
  const dispatch = useDispatch();

  const handleOnChange = e => {
    dispatch(updateSearchQuery(e.target.value));
    setInput(e.target.value);
  };

  const handleTypeFilterChange = e => {
    dispatch(updateTypeFilter(e.target.value));
  };

  const handleAbilityFilterChange = e => {
    dispatch(updateAbilityFilter(e.target.value));
  };

  const handleSortByName = () => {
    dispatch(updateSortBy('name'));
    setSortBy('name');
  };

  const handleSortByHP = () => {
    dispatch(updateSortBy('hp'));
    setSortBy('hp');
  };

  const handleResetFilters = () => {
    dispatch(updateSearchQuery(''));
    dispatch(updateTypeFilter(''));
    dispatch(updateAbilityFilter(''));
    dispatch(updateSortBy(''));
    dispatch(updateSortBy(''));
    setInput('');
    setSortBy('');
  }

  const handleOnKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <section className="search--wrapper">
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
          className={sortBy === 'name' ? 'button--chosen' : 'button'}
          type='button' 
          onClick={handleSortByName}
        >
          Sorter på navn
        </button>
        <button 
          className={sortBy === 'hp' ? 'button--chosen' : 'button'}
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
