import { createSlice } from '@reduxjs/toolkit'

const initialState = [{}];

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {}
});

export default pokemonSlice.reducer;