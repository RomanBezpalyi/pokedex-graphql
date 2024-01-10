import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TMappedFusionPokemon, TFusionListState } from './typings';

export const initialState: TFusionListState = {
  pokemons: [],
};

export const fusionListSlice = createSlice({
  name: "fusionList",
  initialState,
  reducers: {
    /**
     * Update fusion pokémon list
     */
    updateFusionList: (
      state,
      action: PayloadAction<TMappedFusionPokemon[]>
    ) => {
      state.pokemons = [...action.payload, ...state.pokemons];
    },
    /**
     * Set fusion pokémon list
     */
    setFusionList: (state, action: PayloadAction<TMappedFusionPokemon[]>) => {
      state.pokemons = action.payload;
    },
  },
});

export const { setFusionList, updateFusionList } = fusionListSlice.actions;

export const fusionList = fusionListSlice.reducer;
