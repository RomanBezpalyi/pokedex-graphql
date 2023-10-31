import React from 'react'
import { useSelector } from 'react-redux';

import { selectPokemonList } from '../../store/list/selectors';
import { PokemonListItem } from '../';

import css from './PokemonList.module.scss';

export const PokemonList = () => {
  const pokemons = useSelector(selectPokemonList);

  return (
    <ul className={css.pokemonList}>
      {pokemons.map( ({types, name, id}) => <PokemonListItem key={id} types={types} name={name} id={id} /> )}
    </ul>
  )
};
