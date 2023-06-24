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
} from '../../common/utils/helper-functions/filters'

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

/**
 * Info: Pluralization of Pokemon in the code is Pokemons to simplify naming.
 */

/**
 * Fetches the pokemon from the API.
 */
export const fetchPokemonsThunk = createAsyncThunk(
  'pokemons/fetchPokemons',
  fetchPokemons
)

/**
 * Slice containing the reducers and actions.
 */
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    /**
     * Toggles the save state for pokemons (myPokemon)
     */
    toggleSavePokemon: pokemonsAdapter.updateOne,
    /**
     * Updates the search query and filters the Pokemon based on the query.
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the search query.
     */
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Updates the type filter and filters Pokemon based on chosen type.
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the Pokemon type, e.g. "Grass".
     */
    updateTypeFilter: (state, action) => {
      const typeFilter = action.payload;
      state.typeFilter = typeFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Updates the ability filter and filters Pokemon by chosen ability.
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the ability to filter by, e.g. "Run-Away"
     */
    updateAbilityFilter: (state, action) => {
      const abilityFilter = action.payload;
      state.abilityFilter = abilityFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Updates the name of a saved pokemon.
     */
    updatePokemonName: pokemonsAdapter.updateOne,
    /**
     * Updates the sort by in state and sorts either alphabetically or by HP.
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing either "name" or "hp".
     */
    updateSortBy: (state, action) => {
      const sortBy = action.payload;
      state.sortBy = sortBy;
      state.filteredPokemons = filterPokemons(state);
    },
  },
  /**
   * Handles the async actions for fetching Pokemon. 
   */
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
        state.error = `
          The fetching of Pokémon failed with the following 
          error message: "${action.error.message}"
        `; 
      });
  },
});

/**
 * Filters the Pokemon based on search query and filters.
 */
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

/**
 * Actions exported from the slice.
 */
export const { 
  toggleSavePokemon,
  updateSearchQuery,
  updateTypeFilter,
  updateAbilityFilter,
  updatePokemonName,
  updateSortBy,
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

/**
 * Creates a selector object for working with the entity data, e.g. selectEntities. 
 */
const pokemonsSelectors = pokemonsAdapter.getSelectors(
  state => state.pokemons
);

/**
 * Selects all Pokemon that are not saved by the user.
 */
export const selectAllPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => !pokemon.myPokemon)
);

/**
 * Selects all Pokemon that are saved by the user.
 */
export const selectSavedPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => pokemon.myPokemon)
);

