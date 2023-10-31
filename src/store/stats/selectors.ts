import { createSelector } from 'reselect';
import { TPokemonStatsSlice } from './typings';

export const selectStats = ( state: TPokemonStatsSlice ) => state.pokemonStats.stats;

export const selectGeneralStats = createSelector( selectStats, ( stats ) => [...stats, { name: 'Total', id: 7, }] );
