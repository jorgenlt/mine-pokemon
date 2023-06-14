import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TYPEDATA } from '../../common/utils/constants/TYPEDATA'

const initialState = {
  pokemons: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  filteredPokemons: []
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
      icon: TYPEDATA[pokemonType].icon,
      myPokemon: false
    };
  });

  const pokemons = await Promise.all(pokemonDataPromises);
  return pokemons;
})

const filterPokemons = (pokemons, searchQuery) => {
  return pokemons.filter(
    (pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase()) &&
      pokemon.myPokemon === false
  );
};

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    toggleSavePokemon(state, action) {
      const name = action.payload.name;
      console.log(name);
      const pokemon = state.pokemons.find(pokemon => pokemon.name === name);
      if (pokemon) {
        pokemon.myPokemon = !pokemon.myPokemon;
      }
    },
    updateFilteredPokemons(state, action) {
      const query = action.payload.query
      state.searchQuery = query;
      state.filteredPokemons = filterPokemons(state.pokemons, query);
    },
    updatePokemonName(state, action) {
      const index = state.pokemons.findIndex(pokemon => pokemon.name === action.payload.name);
      if (index !== -1) {
        state.pokemons[index] = { 
          ...state.pokemons[index], 
          name: action.payload.newName 
        };
      }
    }
  },
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

export const { 
  toggleSavePokemon,
  updateFilteredPokemons,
  updatePokemonName 
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

export const selectAllPokemons = state => {
  return state.pokemons.pokemons.filter(pokemon => pokemon.myPokemon === false)
};

export const selectSavedPokemons = state => {
  return state.pokemons.pokemons.filter(pokemon => pokemon.myPokemon === true)
};
