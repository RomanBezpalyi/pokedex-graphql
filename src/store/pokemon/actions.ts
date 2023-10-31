import { createAction } from '@reduxjs/toolkit';

import { TPokemonDetails } from './typings';

export const setActivePokemonId = createAction<number>( 'SET_ACTIVE_POKEMON_ID' );

export const setPokemon = createAction<TPokemonDetails>( 'SET_POKEMON' );
