import { combineReducers } from 'redux';

import { pokemonTypes } from './types/slice';
import { pokemonStats } from './stats/slice';
import { pokemonList } from './list/slice';
import { pokemon } from './pokemon/slice';

export const rootReducer = combineReducers( {
  pokemonTypes,
  pokemonStats,
  pokemonList,
  pokemon,
} );
