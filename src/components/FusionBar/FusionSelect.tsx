import React from 'react'
import Select from 'react-select';

import { TFusionSelectProps } from './FusionBar';

import css from './FusionBar.module.scss';

export const FusionSelect = ( { options, value, onChange, label }: TFusionSelectProps ) => (
  <div className={css.selectWrapper}>
    <span className={css.label}>{label}</span>
    <Select className={css.select} options={options} onChange={onChange} value={value} placeholder='Select a Pokemon' />
  </div>
);
