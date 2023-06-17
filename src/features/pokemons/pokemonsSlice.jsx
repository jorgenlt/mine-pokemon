import { createSlice, createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { TYPEDATA } from '../../common/utils/constants/TYPEDATA'

// normalizing state structure with createEntityAdapter
const pokemonsAdapter = createEntityAdapter({
  selectId: pokemon => pokemon.id,
});

const initialState = pokemonsAdapter.getInitialState({
  status: 'idle',
  error: null,
  searchQuery: '',
  filteredAllPokemons: []
});


export const fetchAllPokemons = createAsyncThunk('pokemons/fetchAllPokemons', async () => {
  const limit = 200;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to get Pokemons');
  }
  const data = await response.json();

  // Fetch additional information for each pokemon
  const pokemonDataPromises = data.results.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error(`Failed to get data for ${pokemon.name}`);
    }
    const pokemonData = await response.json();
    const pokemonType = pokemonData.types[0].type.name

    return {
      name: pokemon.name,
      url: pokemon.url,
      image: pokemonData.sprites.other['dream_world']["front_default"],
      hp: pokemonData.stats[0].base_stat,
      abilities: pokemonData.abilities,
      id: pokemonData.id,
      type: pokemonType,
      backgroundColor: TYPEDATA[pokemonType].background,
      icon: TYPEDATA[pokemonType].icon,
      myPokemon: false
    };
  });

  const allPokemons = await Promise.all(pokemonDataPromises);

  return allPokemons;
})

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleSavePokemon: pokemonsAdapter.updateOne,
    updateSearchQuery(state, action) {
      const { query } = action.payload;
      state.searchQuery = query;
      state.filteredAllPokemons = filterPokemons(state, query);
    },
    updatePokemonName: pokemonsAdapter.updateOne
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPokemons.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        pokemonsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchAllPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      })
  }
});

const filterPokemons = createSelector(
  state => state.searchQuery,
  state => pokemonsAdapter.getSelectors().selectAll(state),
  (query, allPokemons) => {
    const filteredPokemons = allPokemons.filter(pokemon =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase()) && !pokemon.myPokemon
    );
    return filteredPokemons;
  }
);

export const { 
  toggleSavePokemon,
  updateSearchQuery,
  updatePokemonName 
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

const pokemonsSelectors = pokemonsAdapter.getSelectors(state => state.pokemons);

export const selectAllPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => !pokemon.myPokemon)
);

export const selectSavedPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => pokemon.myPokemon)
);

