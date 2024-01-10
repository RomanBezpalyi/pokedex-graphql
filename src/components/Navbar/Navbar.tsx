import React from 'react'
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';

import css from './Navbar.module.scss';

export const Navbar = () => {
  const location = useLocation();

  return (
    <header className={css.header}>
      <nav className={css.navigation}>
        <ul className={css.list}>
          <li className={cn(css.link, { [css.active]: location.pathname === '/pokedex' })}>
            <Link to='/pokedex'>Pokedex</Link>
          </li>
          <li className={cn(css.link, { [css.active]: location.pathname === '/fusiondex' })}>
            <Link to='/fusiondex'>Fusiondex</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
};
