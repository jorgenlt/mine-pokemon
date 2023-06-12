import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TYPEDATA } from '../../common/utils/constants/TYPEDATA'

const initialState = {
  pokemons: [],
  status: 'idle',
  error: null
};

export const fetchPokemons = createAsyncThunk('pokemons/fetchPokemons', async () => {
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
      type: pokemonType,
      backgroundColor: TYPEDATA[pokemonType].background,
      icon: TYPEDATA[pokemonType].icon
    };
  });

  const pokemons = await Promise.all(pokemonDataPromises);
  return pokemons;
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














// import { useGetAllPokemonQuery } from '../api/apiSlice'

// const initialState = {
//   pokemons: [],
//   isLoading: false,
//   error: null
// };

// const pokemonSlice = createSlice({
//   name: 'pokemons',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(useGetAllPokemonQuery.pending, state => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(useGetAllPokemonQuery.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.pokemons = action.payload;
//       })
//       .addCase(useGetAllPokemonQuery.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default pokemonSlice.reducer;

// // export const selectAllPokemon = state => state.pokemon