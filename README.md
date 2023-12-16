<h1>My Pokemon</h1>

<div>
  <p>A web application to browse, search, store and edit Pokémon from the <a href="https://pokeapi.co/" target="_blank">PokéAPI</a>.</p>
  </br>
  <p>Visit site: <a href="https://pokemon.jorgenlt.no" target="_blank">pokemon.jorgenlt.no</a></p>
  <p><a href="https://pokemon.jorgenlt.me/docs/index.html" target="_blank">Documentation</a></p>
  <p><a href="https://github.com/jorgenlt/mine-pokemon" target="_blank">View on GitHub</a></p>
  <p>The app is live at <a href="https://pokemon.jorgenlt.no" target="_blank">pokemon.jorgenlt.no</a></p>
  </br>
</div>


<img src="https://jorgenlt.me/images/my-pokemon-desktop2.png" alt="My Pokémon on desktop." height='500px'/><span>&nbsp;&nbsp;&nbsp;&nbsp;</span><img src="https://jorgenlt.me/images/my-pokemon-mobile.png" alt="My Pokémon on mobile." height="500px" />


<h2>Features</h2>
<ul>
  <li>Browse Pokémon from the PokéAPI.</li>
  <li>Search and filter Pokémon.</li>
  <li>Save a Pokémon to a list.</li>
  <li>Edit name of saved Pokémon.</li>
</ul>
<h2>Technologies</h2>
<p>
The application is build with React on the <a href="https://vitejs.dev/" target="_blank">Vite.js</a> framework. 
The app combines <a href="https://redux-toolkit.js.org/" target="_blank">Redux Toolkit</a>
, <a href="https://redux.js.org/usage/writing-logic-thunks" target="_blank">Redux Thunk</a>, 
and selectors to manage the state, handle asynchronous actions, and provide efficient access 
to the Pokemon data. It also utilizes an entity adapter to manage the normalized data structure. 
Data is stored in local storage using <a href="https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration" target="_blank">Redux Persist</a>.
The <a href="https://pokemon.jorgenlt.me/docs/index.html" target="_blank">documentation site</a> is generated 
with <a href="https://jsdoc.app/index.html" target="_blank">JSdoc</a>.
</p>



<h2>Installation</h2>

1. Install the required dependencies using npm: 
  
    `npm install`

<h2>Usage</h2>

1. Start the application by running the following command: 
  
    `npm run dev`

<h2>Technical challenges</h2>

<h3>The Pokémon slice</h3>

<p>Setting up the Redux with Redux Toolkit to mangage the app.</p>

```.js
// src/features/pokemons/pokemonsSlice.jsx

import { 
  createSlice, 
  createAsyncThunk, 
  createSelector, 
  createEntityAdapter 
} from '@reduxjs/toolkit';
import { fetchPokemons } from '../api/api'
import {
  filterByQuery,
  filterByType,
  filterByAbility,
  sortPokemons
} from '../../common/utils/helper-functions/filters'

/**
 * Entity adapter
 * @const pokemonsAdapter
 * 
 */
const pokemonsAdapter = createEntityAdapter({
  selectId: pokemon => pokemon.id,
});

/**
 * Initial state
 * @const initialState
 */
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
 * Fetches the Pokemon with a thunk function
 * @func fetchPokemonsThunk 
 */
export const fetchPokemonsThunk = createAsyncThunk(
  'pokemons/fetchPokemons',
  fetchPokemons
)

/**
 * Slice containing the reducers and actions.
 * Generates action creators and action types.
 * @function pokemonSlice
 */
const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    /**
     * Reducer: Toggles the save state for pokemons (myPokemon)
     * @func toggleSavePokemon
     * @param {Object}
     */
    toggleSavePokemon: pokemonsAdapter.updateOne,
    /**
     * Reducer: Updates the search query and filters the Pokemon based on the query.
     * @func updateSearchQuery
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the search query.
     */
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Reducer: Updates the type filter and filters Pokemon based on chosen type.
     * @func updateTypeFilter
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the Pokemon type, e.g. "Grass".
     */
    updateTypeFilter: (state, action) => {
      const typeFilter = action.payload;
      state.typeFilter = typeFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Reducer: Updates the ability filter and filters Pokemon by chosen ability.
     * @func updateAbilityFilter
     * @param {Object} state - Current state.
     * @param {Object} action - Action containing the ability to filter by, e.g. "Run-Away"
     */
    updateAbilityFilter: (state, action) => {
      const abilityFilter = action.payload;
      state.abilityFilter = abilityFilter;
      state.filteredPokemons = filterPokemons(state);
    },
    /**
     * Reducer: Updates the name of a saved pokemon.
     * @func updatePokemonName
     * @param {Object}
     */
    updatePokemonName: pokemonsAdapter.updateOne,
    /**
     * Reducer: Updates the sort by in state and sorts either alphabetically or by HP.
     * @func updateSortBy
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
        state.error = \`
          The fetching of Pokémon failed with the following 
          error message: "\${action.error.message}"
        \`; 
      });
  },
});

/**
 * Selector: Filters the Pokemon based on search query and filters.
 * @const filterPokemons
 */
const filterPokemons = createSelector(
  state => state.searchQuery,
  state => state.typeFilter,
  state => state.abilityFilter,
  state => state.sortBy,
  pokemonsAdapter.getSelectors().selectAll,
  (searchQuery, typeFilter, abilityFilter, sortBy, allPokemons) => {
    const filteredPokemons = filterByQuery(searchQuery, allPokemons)
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
 * @const pokemonsSelectors
 */
const pokemonsSelectors = pokemonsAdapter.getSelectors(
  state => state.pokemons
);

/**
 * Selector: Selects all Pokemon that are not saved by the user.
 * @func selectAllPokemons
 */
export const selectAllPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => !pokemon.myPokemon)
);

/**
 * Selector: Selects all Pokemon that are saved by the user.
 * @func selectAllPokemons
 */
export const selectSavedPokemons = createSelector(
  pokemonsSelectors.selectAll,
  pokemons => pokemons.filter(pokemon => pokemon.myPokemon)
);
```

<h3>The store</h3>

```.js
// src/app/store.jsx

import { configureStore } from '@reduxjs/toolkit'

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import pokemonsReducer from '../features/pokemons/pokemonsSlice'

/**
 * Configuration object for redux-persist.
 * Only objects on the whitelist are stored.
 * @const persistConfig
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['ids', 'entities', 'status', 'error']
};

/**
 * Persisted reducer
 * @const persistedReducer
 */
const persistedReducer = persistReducer(persistConfig, pokemonsReducer);

/**
 * The Redux store.
 * @const store
 */
export const store = configureStore({
  reducer: {
    pokemons: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

/**
 * The Redux persistor for persisting store state.
 * @const persistor
 */
export const persistor = persistStore(store);
```

<h3>Fetching data from PokeAPI</h3>

```.js
// src/features/api/api.jsx

import { TYPE_DATA } from '../../common/utils/constants/TYPE_DATA'

/**
 * Fetches the Pokemon data from the API.
 * @async
 * @func fetchPokemons
 * @returns {Promise<Object[]>} The array of Pokemon data.
 * @throws {Error} If there is an error fetching the data.
 */
export const fetchPokemons = async () => {
  const limit = 200;
  const url = \`https://pokeapi.co/api/v2/pokemon?limit=\${limit}\`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to get Pokemons');
  }
  const data = await response.json();

  /**
   * @typedef {Object} PokemonData
   * @property {string} name - The name of the Pokemon.
   * @property {string} url - The URL of the Pokemon's details.
   * @property {string} image - The URL of the Pokemon's image.
   * @property {number} hp - The HPof the Pokemon.
   * @property {Object[]} abilities - The abilities of the Pokemon.
   * @property {number} id - The ID of the Pokemon.
   * @property {string} type - The type of the Pokemon.
   * @property {string} backgroundColor - The background color for the Pokemon's type.
   * @property {string} icon - The icon for with the Pokemon's type.
   * @property {boolean} myPokemon - To save/delete Pokemon from the user's list.
   */
  
  const pokemonDataPromises = data.results.map(async (pokemon) => {
    const response = await fetch(pokemon.url);
    if (!response.ok) {
      throw new Error(\`Failed to get data for \${pokemon.name}\`);
    }
    const pokemonData = await response.json();
    const pokemonType = pokemonData.types[0].type.name
    
    /**
     * @type {PokemonData}
     */

    return {
      name: pokemon.name,
      url: pokemon.url,
      image: pokemonData.sprites.other['dream_world']["front_default"],
      hp: pokemonData.stats[0].base_stat,
      abilities: pokemonData.abilities,
      id: pokemonData.id,
      type: pokemonType,
      backgroundColor: TYPE_DATA[pokemonType].background,
      icon: TYPE_DATA[pokemonType].icon,
      myPokemon: false
    };
  });
  
  const pokemons = await Promise.all(pokemonDataPromises);
  
  return pokemons;
}
```

<h3>Folder structure</h3>

```.bash
├── app
│   └── store.jsx
├── App.jsx
├── common
│   └── utils
│       ├── constants
│       │   ├── ABILITIES_LIST.jsx
│       │   ├── TYPE_DATA.jsx
│       │   └── TYPES_LIST.jsx
│       └── helper-functions
│           └── filters.jsx
├── components
│   ├── Footer.jsx
│   ├── Header.jsx
│   └── Loader.jsx
├── features
│   ├── api
│   │   └── api.jsx
│   └── pokemons
│       ├── PokemonCardContent.jsx
│       ├── PokemonCardFooter.jsx
│       ├── PokemonCardHeader.jsx
│       ├── PokemonCard.jsx
│       ├── PokemonEditNameForm.jsx
│       ├── PokemonSearch.jsx
│       ├── PokemonSearchResults.jsx
│       ├── PokemonsList.jsx
│       ├── pokemonsSlice.jsx
│       └── SavedPokemons.jsx
├── main.jsx
└── styles
    ├── app.scss
    ├── components
    │   ├── _footer.scss
    │   ├── _header.scss
    │   ├── _index.scss
    │   └── _loader.scss
    ├── config
    │   ├── _base.scss
    │   ├── _index.scss
    │   └── _variables.scss
    └── features
        └── pokemons
            ├── _card.scss
            ├── _index.scss
            ├── _list.scss
            ├── _saved.scss
            └── _search.scss
```
