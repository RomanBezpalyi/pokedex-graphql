export type TPokemonStat = {
  name: string,
  stat_id?: number,
  id?: number,
};

export type TPokemonStatsState = {
  stats: TPokemonStat[];
};

export type TPokemonStatsSlice = {
  pokemonStats: TPokemonStatsState;
};
