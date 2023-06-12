import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  pokemonData: {},
  status: 'idle',
  error: null
};

export const fetchPokemonData = createAsyncThunk('pokemonData/fetchPokemonData', async () => {
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to get Pokemons');
  }
  const data = await response.json();
  return data.results;
})

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPokemons.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      })
  }
});


export default pokemonsSlice.reducer;

export const selectAllPokemons = state => state.pokemons.pokemons;