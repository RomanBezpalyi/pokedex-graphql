import { TTypeName } from "../types/typings";
import { STAT_MAPPER } from "../../utils";

export type TFusionPokemon = {
  name: string;
  _id: number;
  types: TTypeName[];
  parentIds: number[];
  stats: {
    attack: number;
    spAttack: number;
    defense: number;
    spDefense: number;
    speed: number;
    hp: number;
  };
};

export type TMappedFusionPokemon = {
  name: string;
  id: number;
  types: TTypeName[];
  parentIds: number[];
  stats: {
    name: keyof typeof STAT_MAPPER;
    value: number;
  }[];
};

export type TFusionListState = {
  pokemons: TMappedFusionPokemon[];
};

export type TFusionListSlice = {
  fusionList: TFusionListState;
};
