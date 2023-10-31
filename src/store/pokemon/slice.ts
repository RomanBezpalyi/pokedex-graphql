import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPokemonDetails, TPokemonState } from './typings';

export const initialState: TPokemonState = {
  activePokemonId: 0,
  pokemon: null,
};

export const pokemonSlice = createSlice( {
  name:         'pokemon',
  initialState,
  reducers: {
    /**
     * Set pokémon
     */
    setPokemon: ( state, action: PayloadAction<TPokemonDetails> ) => {
      state.pokemon = action.payload;
    },
    /**
     * Set active pokémon id
     */
    setActivePokemonId: ( state, action: PayloadAction<number> ) => {
      state.activePokemonId = action.payload;
    },
  },
} );

export const {
  setPokemon,
  setActivePokemonId,
} = pokemonSlice.actions;

export const pokemon = pokemonSlice.reducer;
