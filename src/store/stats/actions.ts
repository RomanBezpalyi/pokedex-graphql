import { createAction } from '@reduxjs/toolkit';

import { TPokemonStat } from './typings';

export const setStats = createAction<TPokemonStat[]>( 'SET_STATS' );
