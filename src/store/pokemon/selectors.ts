import { TPokemonSlice } from './typings';

export const selectActivePokemon = ( state: TPokemonSlice ) => state.pokemon.pokemon;
export const selectActivePokemonId = ( state: TPokemonSlice ) => state.pokemon.activePokemonId;
