import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import { TYPEDATA } from '../../common/utils/constants/TYPEDATA'
import { shuffleArray } from '../../common/utils/helperFunctions/shuffleArray'

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
      const { id } = action.payload;
    
      // Find the pokemon in allPokemons array
      const pokemonIndex = state.allPokemons.findIndex(pokemon => pokemon.id === id);
      if (pokemonIndex !== -1) {
        const pokemon = state.allPokemons[pokemonIndex];
        pokemon.myPokemon = !pokemon.myPokemon;
      }
    },
    updateSearchQuery(state, action) {
      const { query } = action.payload;
      state.searchQuery = query;
      state.filteredAllPokemons = filterAllPokemons(state.allPokemons, query);
    },
    updatePokemonName(state, action) {
      const { newName, id } = action.payload;
    
      const index = state.allPokemons.findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        // state.savedPokemons[savedPokemonIndex].name = newName;
        state.allPokemons[index].name = newName;
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
        if(state.allPokemons.length === 0) {
          state.allPokemons = action.payload;
          shuffleArray(state.allPokemons);
        }
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

const selectPokemonsState = state => state.pokemons;

export const selectAllPokemons = createSelector(
  selectPokemonsState,
  pokemonsState => pokemonsState.allPokemons.filter(pokemon => !pokemon.myPokemon)
);

export const selectSavedPokemons = createSelector(
  selectPokemonsState,
  pokemonState => pokemonState.allPokemons.filter(pokemon => pokemon.myPokemon)
);
