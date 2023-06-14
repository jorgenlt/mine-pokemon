import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TYPEDATA } from '../../common/utils/constants/TYPEDATA'

const initialState = {
  allPokemons: [],
  status: 'idle',
  error: null,
  searchQuery: '',
  filteredAllPokemons: []
};

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
      type: pokemonType,
      backgroundColor: TYPEDATA[pokemonType].background,
      icon: TYPEDATA[pokemonType].icon,
      myPokemon: false
    };
  });

  const allPokemons = await Promise.all(pokemonDataPromises);
  return allPokemons;
})

const filterAllPokemons = (allPokemons, searchQuery) => {
  return allPokemons.filter(
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
      const { name } = action.payload;
      const pokemon = state.allPokemons.find(pokemon => pokemon.name === name);
      if (pokemon) {
        pokemon.myPokemon = !pokemon.myPokemon;
      }
    },
    updateSearchQuery(state, action) {
      const { query } = action.payload;
      state.searchQuery = query;
      state.filteredAllPokemons = filterAllPokemons(state.allPokemons, query);
    },
    updatePokemonName(state, action) {
      const { name, newName} = action.payload;
      const index = state.allPokemons.findIndex(pokemon => pokemon.name === name);
      if (index !== -1) {
        state.allPokemons[index] = { 
          ...state.allPokemons[index], 
          name: newName 
        };
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllPokemons.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchAllPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allPokemons = action.payload;
      })
      .addCase(fetchAllPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; 
      })
  }
});

export const { 
  toggleSavePokemon,
  updateSearchQuery,
  updatePokemonName 
} = pokemonsSlice.actions;

export default pokemonsSlice.reducer;

export const selectAllPokemons = state => {
  return state.pokemons.allPokemons.filter(pokemon => pokemon.myPokemon === false)
};

export const selectSavedPokemons = state => {
  return state.pokemons.allPokemons.filter(pokemon => pokemon.myPokemon === true)
};
