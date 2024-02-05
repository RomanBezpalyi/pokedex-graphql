import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { loadFusionPokemonList } from '../graphQL/queries';
import { mapFusionList } from '../utils';
import { setFusionList } from '../store/fusionList/slice';
import { selectFusionList } from '../store/fusionList/selectors';

import { FusionDashboard, LoadingIcon, FusionBar } from '../components';

export const Fusiondex = () => {
  const dispatch = useDispatch();
  const fusionList = useSelector(selectFusionList);

  const { data: pokemonListData, loading } = useQuery(
    loadFusionPokemonList()
  );

  useEffect(() => {
    if (pokemonListData && !fusionList.length) {
      const { pokemons: { pokemons } } = pokemonListData;
      const pokemonList = mapFusionList(pokemons);
      dispatch(setFusionList(pokemonList));
    }
  }, [pokemonListData, dispatch, fusionList.length]);

  return (
    <div className='pokedex'>
      <FusionBar />
      {loading && !fusionList.length && <LoadingIcon className='fusion-loader' />}
      {!!fusionList.length && <FusionDashboard />}
    </div>
  )
};

