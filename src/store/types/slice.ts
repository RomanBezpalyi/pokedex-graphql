import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPokemonTypesState, TPokemonType } from './typings';

export const initialState: TPokemonTypesState = {
  types: [],
};

export const pokemonTypesSlice = createSlice( {
  name:         'types',
  initialState,
  reducers: {
    /**
     * Set pokémon types
     */
    setAllTypes: ( state, action: PayloadAction<TPokemonType[]> ) => {
      state.types = action.payload;
    },
  },
} );

export const {
  setAllTypes,
} = pokemonTypesSlice.actions;

export const pokemonTypes = pokemonTypesSlice.reducer;
