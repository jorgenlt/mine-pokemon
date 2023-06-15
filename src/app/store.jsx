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
  key: 'root', // Key under which the state will be stored in the storage
  version: 1,
  storage, // Storage engine, such as localStorage or AsyncStorage
  whitelist: ['allPokemons', 'savedPokemons', 'status']
};

const persistedReducer = persistReducer(persistConfig, pokemonsReducer);


export const store = configureStore({
  reducer: {
    pokemons: persistedReducer,
  },
  // Non-Serializable Data: ignore all the action types that are dispatched
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

