import { createSelector } from "reselect";

import { TPokemonListSlice } from "./typings";
import { selectTypes } from "../types/selectors";
import { TTypeName } from "../types/typings";

const selectPokemons = (state: TPokemonListSlice) => state.pokemonList.pokemons;

export const selectPokemonList = createSelector(
  selectPokemons,
  selectTypes,
  (pokemons, pokemonTypes) =>
    pokemons?.map(({ types, ...pokemon }) => ({
      ...pokemon,
      types: types!.map(
        (type) =>
          pokemonTypes.find(({ id }) => id === type)?.name ||
          (type as TTypeName)
      ),
    }))
);

export const selectPokemonById = (id: number) =>
  createSelector(selectPokemonList, (pokemons) =>
    pokemons.find((pokemon) => pokemon.id === id)
  );
