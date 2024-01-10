import { TTypeName, TPokemonTypeId } from '../types/typings';

export type TPokemonStat = {
  value: number;
  id: number;
}

export type TPokemonStatApi = {
  base_stat: number;
  pokemon_v2_stat: Record<'pokemon_v2_statnames', Record<'stat_id', number>[]>
}

type TPokemonAbility = {
  name: string;
  id: number;
}

export type TPokemonAbilityApi = {
  ability_id: number,
  pokemon_v2_ability: Record<'pokemon_v2_abilitynames', Record<'name', string>[]>;
}

type TEvolutionLineSpecy = {
  id: number;
  minLevel: number | null;
}

export type TEvolutionLineSpecyApi = {
  id: number;
  pokemon_v2_pokemonevolutions: [Record<'min_level', number>];
}

export type TPokemonDescriptionApi = [Record<'flavor_text', string>];

export type TPokemonSpecyApi = {
  pokemon_v2_evolutionchain: Record<'pokemon_v2_pokemonspecies', TEvolutionLineSpecyApi[]>;
  pokemon_v2_pokemonspeciesflavortexts?: TPokemonDescriptionApi;
};

export type TPokemonDetails = {
  name: string;
  id: number;
  height: number;
  weight: number;
  types?: number[] | TTypeName[];
  pokemon_v2_pokemontypes?: TPokemonTypeId[];
  stats?: TPokemonStat[];
  pokemon_v2_pokemonstats?: TPokemonStatApi[];
  abilities?: TPokemonAbility[];
  pokemon_v2_pokemonabilities?: TPokemonAbilityApi[];
  description?: string;
  evolutionLine?: TEvolutionLineSpecy[];
  pokemon_v2_pokemonspecy?: TPokemonSpecyApi;
};

export type TPokemonState = {
  activePokemonId: number;
  pokemon: TPokemonDetails | null;
};

export type TPokemonSlice = {
  pokemon: TPokemonState;
}
