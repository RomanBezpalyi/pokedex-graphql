import { TFusionListSlice } from './typings';

export const selectFusionList = (state: TFusionListSlice) => state.fusionList.pokemons;
