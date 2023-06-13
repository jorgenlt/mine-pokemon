import { configureStore } from '@reduxjs/toolkit'

import pokemonsReducer from '../features/pokemons/pokemonsSlice'

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer
  },
})
