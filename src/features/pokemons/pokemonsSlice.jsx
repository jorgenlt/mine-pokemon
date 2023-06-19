import { 
  createSlice, 
  createAsyncThunk, 
  createSelector, 
  createEntityAdapter 
} from '@reduxjs/toolkit';
import { fetchPokemons } from '../api/api'
import {
  filterByName,
  filterByType,
  filterByAbility,
  sortPokemons
} from '../../common/utils/helperFunctions/filters'

const pokemonsAdapter = createEntityAdapter({
  selectId: pokemon => pokemon.id,
});

const initialState = pokemonsAdapter.getInitialState({
  status: 'idle',
  error: null,
  searchQuery: '',
  filteredPokemons: [],
  typeFilter: '',
  abilityFilter: '',
  sortBy: '',
});

export const fetchPokemonsThunk = createAsyncThunk(
  'pokemons/fetchPokemons',
  fetchPokemons
)

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleSavePokemon: pokemonsAdapter.updateOne,
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredPokemons = filterPokemons(state);
    },
    updateTypeFilter: (state, action) => {
      const typeFilter = action.payload;
      state.typeFilter = typeFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    updateAbilityFilter: (state, action) => {
      const abilityFilter = action.payload;
      state.abilityFilter = abilityFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    updatePokemonName: pokemonsAdapter.updateOne,
    updateSortBy: (state, action) => {
      const sortBy = action.payload;
      state.sortBy = sortBy;
      state.filteredPokemons = filterPokemons(state);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemonsThunk.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPokemonsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        pokemonsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPokemonsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      });
  },
});

const filterPokemons = createSelector(
  state => state.searchQuery,
  state => state.typeFilter,
  state => state.abilityFilter,
  state => state.sortBy,
  pokemonsAdapter.getSelectors().selectAll,
  (searchQuery, typeFilter, abilityFilter, sortBy, allPokemons) => {
    const filteredPokemons = filterByName(searchQuery, allPokemons)
      .filter(pokemon => filterByType(typeFilter, pokemon))
      .filter(pokemon => filterByAbility(abilityFilter, pokemon))
      .filter(pokemon => !pokemon.myPokemon);

    return sortPokemons(sortBy, filteredPokemons);
  }
);

export const { 
  toggleSavePokemon,
  updateSearchQuery,
  updateTypeFilter,
  updateAbilityFilter,
  updatePokemonName,
  updateSortBy,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

const pokemonsSelectors = pokemonsAdapter.getSelectors(
  state => state.pokemons
);

export const selectAllPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => !pokemon.myPokemon)
);

export const selectSavedPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => pokemon.myPokemon)
);

