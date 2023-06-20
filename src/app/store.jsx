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

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['ids', 'entities', 'status', 'error']
};

const persistedReducer = persistReducer(persistConfig, pokemonsReducer);

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

export const persistor = persistStore(store);

