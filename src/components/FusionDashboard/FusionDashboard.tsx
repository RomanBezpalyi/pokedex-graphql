import React from 'react'

import { FusionList } from '..';

import css from './FusionDashboard.module.scss';

export const FusionDashboard = () => (
  <div className={css.wrapper}>
    <div className={css.fusionDashboard}>
      <FusionList />
    </div>
  </div>
);
