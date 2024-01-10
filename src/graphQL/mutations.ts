import { gql } from "@apollo/client";

export const createPokemonFusion = gql`
  mutation createPokemon(
    $name: String!
    $types: [String!]!
    $parentIds: [Int!]!
    $attack: Int!
    $defense: Int!
    $spAttack: Int!
    $spDefense: Int!
    $hp: Int!
    $speed: Int!
  ) {
    createPokemon(
      pokemonInput: {
        name: $name
        types: $types
        parentIds: $parentIds
        stats: {
          attack: $attack
          defense: $defense
          spAttack: $spAttack
          spDefense: $spDefense
          hp: $hp
          speed: $speed
        }
      }
    ) {
      name
      parentIds
      types
      _id
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
`;
