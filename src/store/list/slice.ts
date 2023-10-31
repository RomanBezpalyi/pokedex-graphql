import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPokemon, TPokemonListState } from './typings';

export const initialState: TPokemonListState = {
  pokemons: [],
};

export const pokemonListSlice = createSlice( {
  name:         'pokemons',
  initialState,
  reducers: {
    /**
     * Update pokémon list
     */
    updatePokemonList: ( state, action: PayloadAction<TPokemon[]> ) => {
      state.pokemons = [...state.pokemons, ...action.payload];
    },
     /**
     * Set pokémon list
     */
     setPokemonList: ( state, action: PayloadAction<TPokemon[]> ) => {
      state.pokemons = action.payload;
    },
  },
} );

export const {
  setPokemonList,
  updatePokemonList,
} = pokemonListSlice.actions;

export const pokemonList = pokemonListSlice.reducer;
