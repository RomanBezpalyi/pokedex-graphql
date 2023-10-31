import { createAction } from '@reduxjs/toolkit';

import { TPokemonType } from './typings';

export const setAllTypes = createAction<TPokemonType[]>( 'SET_ALL_TYPES' );
