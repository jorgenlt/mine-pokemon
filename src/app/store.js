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

