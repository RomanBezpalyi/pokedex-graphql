import { TPokemonTypesSlice } from './typings';

export const selectTypes = ( state: TPokemonTypesSlice ) => state.pokemonTypes.types;
