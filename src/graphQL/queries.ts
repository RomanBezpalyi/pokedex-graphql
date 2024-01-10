import { gql } from "@apollo/client";

export const KANTO_ENTRIES_AMOUNT = 151;
const LANGUAGE_ID = 9; // English
const VERSION_ID = 14; // Specifies the version of Pokédex

export const loadPokemonTypes = gql`
  query {
    pokemon_v2_typename(where: {language_id: {_eq: ${LANGUAGE_ID}}}) {
      name
      type_id
    }
  }
`;

export const loadStatNames = gql`
  query {
    pokemon_v2_statname(where: {language_id: {_eq: ${LANGUAGE_ID}}, stat_id: {_lt: 7}}) {
      name
      stat_id
    }
  }
`;

export const loadPokemonList = (limit: number = 151, offset: number = 0) => gql`
  query {
    pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}) {
      name
      id
      pokemon_v2_pokemontypes {
        type_id
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          pokemon_v2_statnames(where: {language_id: {_eq: ${LANGUAGE_ID}}}) {
            stat_id
          }
        }
      }
    }
  }
`;

export const loadPokemonListByQuery = (query: string) => gql`
  query {
    pokemon_v2_pokemon(where: {name: {_iregex: "^.*${query}.*$"}, id: {_lte: ${KANTO_ENTRIES_AMOUNT}}}) {
      name
      id
      pokemon_v2_pokemontypes {
        type_id
      }
    }
  }
`;

export const loadPokemon = (id: number) => gql`
  query {
    pokemon_v2_pokemon(where: {id: {_eq: ${id}}}) {
      name
      id
      height
      weight
      pokemon_v2_pokemontypes {
        type_id
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          pokemon_v2_statnames(where: {language_id: {_eq: ${LANGUAGE_ID}}}) {
            stat_id
          }
        }
      }
      pokemon_v2_pokemonabilities {
        ability_id
        pokemon_v2_ability {
          pokemon_v2_abilitynames(where: {language_id: {_eq: ${LANGUAGE_ID}}}) {
            name
          }
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies(where: {id: {_lt: ${
            KANTO_ENTRIES_AMOUNT + 1
          }}}) {
            id
            pokemon_v2_pokemonevolutions {
              min_level
            }
          }
        }
        pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: ${LANGUAGE_ID}}, version_id: {_eq: ${VERSION_ID}}}) {
          flavor_text
        }
      }
    }
  }
`;

export const loadFusionPokemonList = () => gql`
  query {
    pokemons {
      pokemons {
        _id
        name
        types
        parentIds
        stats {
          attack
          defense
          spAttack
          spDefense
          speed
          hp
        }
      }
    }
  }
`;
