import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

// import { Navbar, Sidebar } from './components'
import { NotFoundPage, Pokedex } from './pages';

import { loadPokemonTypes, loadStatNames } from './graphQL/queries';
import { setAllTypes } from './store/types/slice';
import { setAllStats } from './store/stats/slice';
import { mapPokemonTypes, mapPokemonStats } from './utils';

import './index.scss'

const App = () => {
  const dispatch = useDispatch();
  const { data: typeData } = useQuery( loadPokemonTypes );
  const { data: statData } = useQuery( loadStatNames );

  useEffect(() => {
    if (typeData) {
      const { pokemon_v2_typename: types } = typeData;
      const typesToSet = mapPokemonTypes(types);
      dispatch( setAllTypes( typesToSet ) );
    };
  }, [typeData, dispatch]);

  useEffect(() => {
    if (statData) {
      const { pokemon_v2_statname: stats } = statData;
      dispatch( setAllStats( mapPokemonStats( stats ) ) );
    };
  }, [statData, dispatch]);

  return (
    <>
      {/* <Navbar /> */}
      <div className='body'>
        <main>
          <Routes>
            <Route index element={<Navigate replace to='/pokedex' />} />
            <Route path='/pokedex' element={<Pokedex />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App;
