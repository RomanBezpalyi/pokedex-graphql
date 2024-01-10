import { createAction } from '@reduxjs/toolkit';

import { TFusionPokemon } from './typings';

export const setFusionList = createAction<TFusionPokemon[]>("SET_FUSION_LIST");
export const updateFusionList = createAction<TFusionPokemon[]>("UPDATE_FUSION_LIST");
