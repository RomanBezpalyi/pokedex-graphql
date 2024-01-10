import React from 'react'

import { TMappedFusionPokemon } from '../../store/fusionList/typings';
import { STAT_COLORS, STAT_MAPPER, TYPE_COLORS } from '../../utils';
import { SPRITE_URL } from '../../api/constants';

import css from './FusionListItem.module.scss';

export const FusionListItem = ({ id, name, types, parentIds, stats }: TMappedFusionPokemon) => {
  return (
    <div className={css.pokemonListItem} >
      <img alt={name} className={css.sprite} src={`${SPRITE_URL}${parentIds[0]}.png`} />
      <img alt={name} className={css.sprite} src={`${SPRITE_URL}${parentIds[1]}.png`} />
      <h3 className={css.name}>{name.replace( '-', ' ' )}</h3>
      <div>{types?.map( (type) =>
        <span 
          key={`${id}-${type}`} 
          className={css.type}
          style={{background: TYPE_COLORS[type as keyof typeof TYPE_COLORS]}}
        >
          {type}
        </span>)}
      </div>
      <div className={css.stats}>
        {stats.map(({ name, value }) =>
          <div key={id} className={css.stat}>
            <h4 className={css.statTitle} style={{ background: STAT_COLORS[name as keyof typeof STAT_COLORS] }}>{STAT_MAPPER[name as keyof typeof STAT_MAPPER]}</h4>
            <span>{value}</span>
          </div>
        )}
      </div>
    </div>
  )
};
