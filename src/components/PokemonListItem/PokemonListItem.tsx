import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { usePokemonDashboard } from '../../store/context/PokedexDashboardContext';
import { TPokemon } from '../../store/list/typings';
import { setActivePokemonId } from '../../store/pokemon/slice';
import { selectActivePokemonId } from '../../store/pokemon/selectors';
import { TYPE_COLORS } from '../../utils';
import { SPRITE_URL } from '../../';

import css from './PokemonListItem.module.scss';

export const PokemonListItem = ({ id, name, types }: TPokemon) => {
  const { setShouldShowCard } = usePokemonDashboard();
  const dispatch = useDispatch();
  const activePokemonId = useSelector( selectActivePokemonId );

  const onClick = () => {
    if ( activePokemonId !== id ) {
      dispatch( setActivePokemonId( id ) );
      setShouldShowCard( false );
    }
  };

  return (
    <div className={css.pokemonListItem} onClick={onClick}>
      <img alt={name} className={css.sprite} src={`${SPRITE_URL}${id}.png`} />
      <span className={css.number}>N° {id}</span>
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
    </div>
  )
};
