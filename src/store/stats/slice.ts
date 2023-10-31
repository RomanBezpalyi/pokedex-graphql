import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TPokemonStatsState, TPokemonStat } from './typings';

export const initialState: TPokemonStatsState = {
  stats: [],
};

export const pokemonStatsSlice = createSlice( {
  name:         'stats',
  initialState,
  reducers: {
    /**
     * Set pokémon stats
     */
    setAllStats: ( state, action: PayloadAction<TPokemonStat[]> ) => {
      state.stats = action.payload;
    },
  },
} );

export const {
  setAllStats,
} = pokemonStatsSlice.actions;

export const pokemonStats = pokemonStatsSlice.reducer;
