import { STAT_REQUEST_LABEL_MAPPER } from ".";
import { TPokemon } from "../store/list/typings";
import { TPokemonStat } from "../store/pokemon/typings";
import { TTypeName } from "../store/types/typings";

type TStatRequestLabel =
  | "attack"
  | "defense"
  | "hp"
  | "spAttack"
  | "spDefense"
  | "speed";

const getRandomIndex = () => Math.floor(Math.random() * (1 - 0 + 1) + 1);

export const getNewPokemonName = (name1: string, name2: string) =>
  name1[0].toUpperCase() +
  name1.substring(1, Math.ceil(name1.length / 2)) +
  name2.substring(Math.ceil(name2.length / 2));

export const getNewPokemonStats = (
  parent1stats: TPokemonStat[],
  parent2stats: TPokemonStat[]
) =>
  parent1stats.slice(0, 6).reduce((acc, stat) => {
    const pokemon2Stat = parent2stats.find(({ id }) => id === stat.id);
    return {
      ...acc,
      [STAT_REQUEST_LABEL_MAPPER[
        stat.id as keyof typeof STAT_REQUEST_LABEL_MAPPER
      ]]: [stat.value, pokemon2Stat?.value][getRandomIndex() - 1],
    };
  }, {} as Record<TStatRequestLabel, number>);

export const getNewPokemonTypes = (
  parent1Types: TTypeName[],
  parent2Types: TTypeName[]
) => {
  const newTypes = [];
  newTypes.push(parent1Types[0]);
  if (parent2Types.length === 2) {
    if (parent2Types[1] !== newTypes[0]) {
      newTypes.push(parent2Types[1]);
    } else {
      if (parent2Types[0] !== newTypes[0]) {
        newTypes.push(parent2Types[0]);
      }
    }
  } else {
    if (parent2Types[0] !== newTypes[0]) {
      newTypes.push(parent2Types[0]);
    }
  }
  return newTypes;
};

export const getNewPokemonRequestData = (
  parent1: TPokemon,
  parent2: TPokemon
) => ({
  name: getNewPokemonName(parent1.name, parent2.name),
  types: getNewPokemonTypes(
    parent1.types! as TTypeName[],
    parent2.types! as TTypeName[]
  ),
  stats: getNewPokemonStats(parent1.stats!, parent2.stats!),
  parentIds: [parent1.id, parent2.id],
});
