import React, { forwardRef } from 'react'

import { PokemonList } from '..';

import css from './PokedexDashboard.module.scss';

type TPokedexDashboardProps = {
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onScroll: () => void,
};

export const PokedexDashboard = forwardRef<HTMLDivElement, TPokedexDashboardProps>(( { onScroll }, ref ) => (
  <div ref={ref} onScroll={onScroll} className={css.wrapper}>
    <div className={css.pokedexDashboard}>
      <PokemonList />
    </div>
  </div>
));
