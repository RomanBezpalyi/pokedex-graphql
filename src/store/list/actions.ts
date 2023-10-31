import { createAction } from '@reduxjs/toolkit';

import { TPokemon } from './typings';

export const setPokemonList = createAction<TPokemon[]>( 'SET_POKEMON_LIST' );
export const updatePokemonList = createAction<TPokemon[]>( 'UPDATE_POKEMON_LIST' );
