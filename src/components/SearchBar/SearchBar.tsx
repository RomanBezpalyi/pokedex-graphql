import React from 'react'

import { ReactComponent as SearchIcon } from './search-svgrepo-com.svg';

import css from './SearchBar.module.scss';

type TSearchBarProps = {
  value: string;
  onChange: (e: any) => void;
}

export const SearchBar = ( { value, onChange }: TSearchBarProps ) => (
  <div className={css.wrapper}>
    <input className={css.input} type='select' onChange={onChange} value={value} placeholder='Search Pokémon by name' />
    <button className={css.button}><SearchIcon/></button>
  </div>
);
