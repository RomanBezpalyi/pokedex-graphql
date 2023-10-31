export type TTypeName = 
| 'Normal'
| 'Fighting'
| 'Flying'
| 'Poison'
| 'Ground'
| 'Rock'
| 'Grass'
| 'Water'
| 'Psychic'
| 'Ghost'
| 'Dark'
| 'Fairy'
| 'Electric'
| 'Steel'
| 'Ice'
| 'Bug'
| 'Dragon'
| 'Fire'
| '???'
| 'Shadow';

export type TPokemonTypeName = {
  name: TTypeName,
};

export type TPokemonTypeId = {
  type_id: number,
};

export type TPokemonTypeApi = TPokemonTypeId & TPokemonTypeName;

export type TPokemonType = {
  id: number;
} & TPokemonTypeName;

export type TPokemonTypesState = {
  types: TPokemonType[];
};

export type TPokemonTypesSlice = {
  pokemonTypes: TPokemonTypesState;
};
