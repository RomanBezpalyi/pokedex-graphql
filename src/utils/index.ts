import { TPokemonTypeApi, TPokemonTypeId } from "../store/types/typings";
import { TPokemonStat } from "../store/stats/typings";
import { TPokemon } from "../store/list/typings";
import {
  TPokemonDetails,
  TPokemonDescriptionApi,
  TEvolutionLineSpecyApi,
  TPokemonAbilityApi,
  TPokemonStatApi,
} from "../store/pokemon/typings";
import { KANTO_ENTRIES_AMOUNT } from "../graphQL/queries";
import { TFusionPokemon } from "../store/fusionList/typings";

export const TYPE_COLORS = {
  Normal: "#BCBCAC",
  Fighting: "#BC5442",
  Flying: "#669AFF",
  Poison: "#AB549A",
  Ground: "#DEBC54",
  Rock: "#BCAC66",
  Bug: "#ABBC1C",
  Ghost: "#6666BC",
  Steel: "#ABACBC",
  Fire: "#FF421C",
  Water: "#2F9AFF",
  Grass: "#78CD54",
  Electric: "#FFCD30",
  Psychic: "#FF549A",
  Ice: "#78DEFF",
  Dragon: "#7866EF",
  Dark: "#785442",
  Fairy: "#FFACFF",
  Shadow: "#0E2E4C",
} as const;

export const STAT_COLORS = {
  HP: "#DF2140",
  Attack: "#FF994D",
  Defense: "#eecd3d",
  "Special Attack": "#85DDFF",
  "Special Defense": "#96da83",
  Speed: "#FB94A8",
  Total: "#7195DC",
} as const;

export const STAT_MAPPER = {
  HP: "HP",
  Attack: "ATK",
  Defense: "DEF",
  "Special Attack": "SpA",
  "Special Defense": "SpD",
  Speed: "SPD",
  Total: "Σ",
} as const;

export const STAT_REQUEST_LABEL_MAPPER = {
  1: "hp",
  2: "attack",
  3: "defense",
  4: "spAttack",
  5: "spDefense",
  6: "speed",
} as const;

export const getQueryParams =
  (baseLimit: number) => (limit: number, offset: number) => {
    const o = (offset += limit);
    const l =
      offset + baseLimit > KANTO_ENTRIES_AMOUNT
        ? KANTO_ENTRIES_AMOUNT - offset
        : baseLimit;

    return { offset: o, limit: l };
  };

export const mapPokemonTypes = (pokemonTypes: TPokemonTypeApi[]) =>
  pokemonTypes.map(({ name, type_id }) => ({
    name,
    id: type_id,
  }));

export const mapPokemonStats = (pokemonStats: TPokemonStat[]) =>
  pokemonStats.map(({ name, stat_id }) => ({
    name,
    id: stat_id,
  }));

export const mapPokemonList = (pokemonList: TPokemon[]) =>
  pokemonList.map(
    ({ name, id, pokemon_v2_pokemontypes, pokemon_v2_pokemonstats }) => ({
      name,
      id,
      types: pokemon_v2_pokemontypes!.map(({ type_id }) => type_id),
      stats: mapPokemonStatValues(pokemon_v2_pokemonstats!),
    })
  );

const mapPokemonDescription = (description: TPokemonDescriptionApi) =>
  description[0].flavor_text;

const mapPokemonEvolutionLine = (
  id: number,
  evolutionLine: TEvolutionLineSpecyApi[]
) => {
  const mappedEvolutions = evolutionLine.map(
    ({ id, pokemon_v2_pokemonevolutions }) => ({
      id,
      minLevel: pokemon_v2_pokemonevolutions[0]?.min_level,
    })
  );
  // Check for Hitmonchan and Hitmonlee
  if (id === 106 || id === 107)
    return mappedEvolutions.filter(({ id: evoId }) => evoId === id);
  if (id < 133 || id > 136) return mappedEvolutions;
  // Check for the eevee-lutions. Non-linear evolution line
  return mappedEvolutions.filter(
    ({ id: evoId }) =>
      (id === 133 ? evoId === id + 1 : evoId === 133) || evoId === id
  );
};

const mapPokemonAbilities = (abilities: TPokemonAbilityApi[]) =>
  abilities
    .map(({ ability_id, pokemon_v2_ability }) => ({
      id: ability_id,
      name: pokemon_v2_ability.pokemon_v2_abilitynames[0].name,
    }))
    .slice(0, 2);

const mapPokemonStatValues = (stats: TPokemonStatApi[]) => [
  ...stats.map(({ base_stat, pokemon_v2_stat }) => ({
    id: pokemon_v2_stat.pokemon_v2_statnames[0].stat_id,
    value: base_stat,
  })),
  { id: 7, value: stats.reduce((acc, { base_stat }) => (acc += base_stat), 0) },
];

const mapPokemonTypeValues = (types: TPokemonTypeId[]) =>
  types.map(({ type_id }) => type_id);

export const mapPokemon = (pokemon: TPokemonDetails[]) =>
  pokemon.map(
    ({
      id,
      name,
      weight,
      height,
      pokemon_v2_pokemonspecy,
      pokemon_v2_pokemonabilities,
      pokemon_v2_pokemonstats,
      pokemon_v2_pokemontypes,
    }) => ({
      id,
      name,
      weight,
      height,
      description: mapPokemonDescription(
        pokemon_v2_pokemonspecy!.pokemon_v2_pokemonspeciesflavortexts!
      ),
      evolutionLine: mapPokemonEvolutionLine(
        id,
        pokemon_v2_pokemonspecy!.pokemon_v2_evolutionchain!
          .pokemon_v2_pokemonspecies
      ),
      abilities: mapPokemonAbilities(pokemon_v2_pokemonabilities!),
      stats: mapPokemonStatValues(pokemon_v2_pokemonstats!),
      types: mapPokemonTypeValues(pokemon_v2_pokemontypes!),
    })
  );

export const mapFusionList = (pokemons: TFusionPokemon[]) =>
  pokemons.map(({ _id, name, parentIds, types, stats }) => {
    const statValues = Object.entries(stats).filter(
      ([_, value]) => typeof value === "number"
    );
    const statsToSet = statValues.map(([name, value]) => {
      let statName;
      switch (name) {
        case "hp":
          statName = name.toUpperCase();
          break;
        case "spAttack":
        case "spDefense":
          statName = "Special " + name.substring(2);
          break;
        default:
          statName = name[0].toUpperCase() + name.substring(1);
          break;
      }
      return {
        name: statName as keyof typeof STAT_MAPPER,
        value,
      };
    });
    return {
      id: _id,
      name,
      parentIds,
      types,
      stats: statsToSet,
    };
  });

export const mapPokemonListToSelectOptions = (pokemons: TPokemon[]) =>
  pokemons.map(({ id, name }) => ({
    value: id,
    label: name[0].toUpperCase() + name.substring(1),
  }));
