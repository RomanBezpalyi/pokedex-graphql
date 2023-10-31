import React from 'react'
import cn from 'classnames';

import pokeball from '../../assets/pokeball-icon.png';

import css from './LoadingIcon.module.scss';

export const LoadingIcon = ({ className }: JSX.IntrinsicElements['img']) => (
  <img alt={'Loading'} className={cn( css.loading, className )} src={pokeball} />
);
