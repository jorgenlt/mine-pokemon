import { configureStore } from '@reduxjs/toolkit'

import pokemonsReducer from '../features/pokemons/pokemonsSlice'

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer
  },
})




// import { apiSlice } from '../features/api/apiSlice'

// export default configureStore({
//   reducer: {
//     pokemon: pokemonReducer,
//     [apiSlice.reducerPath]: apiSlice.reducer
//   },
//   middleware: getDefaultMiddleware => 
//     getDefaultMiddleware().concat(apiSlice.middleware)
// })