import { TTypeName, TPokemonTypeId } from '../types/typings';

export type TPokemon = {
  name: string,
  id: number
  types?: number[] | TTypeName[];
  pokemon_v2_pokemontypes?: TPokemonTypeId[];
};

export type TPokemonListState = {
  pokemons: TPokemon[];
};

export type TPokemonListSlice = {
  pokemonList: TPokemonListState;
}
