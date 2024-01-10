import React from 'react'
import { useSelector } from 'react-redux';

import { selectFusionList } from '../../store/fusionList/selectors';
import { FusionListItem } from '..';

import css from './FusionList.module.scss';

export const FusionList = () => {
  const pokemons = useSelector(selectFusionList);

  return (
    <ul className={css.fusionList}>
      {pokemons.map(({ types, name, id, stats, parentIds }) => <FusionListItem key={id} parentIds={parentIds} stats={stats} types={types} name={name} id={id} />)}
    </ul>
  )
};
