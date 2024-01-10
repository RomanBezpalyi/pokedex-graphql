import { TTypeName, TPokemonTypeId } from '../types/typings';
import { TPokemonStat as TMappedStat, TPokemonStatApi } from "../pokemon/typings";

export type TPokemon = {
  name: string;
  id: number;
  types?: number[] | TTypeName[];
  pokemon_v2_pokemontypes?: TPokemonTypeId[];
  stats?: TMappedStat[];
  pokemon_v2_pokemonstats?: TPokemonStatApi[];
};

export type TPokemonListState = {
  pokemons: TPokemon[];
};

export type TPokemonListSlice = {
  pokemonList: TPokemonListState;
}
