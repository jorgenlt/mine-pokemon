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
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['ids', 'entities', 'status', 'error']
};

const persistedReducer = persistReducer(persistConfig, pokemonsReducer);

/**
 * The Redux store.
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
 */
export const persistor = persistStore(store);

