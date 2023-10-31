import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';

import { KANTO_ENTRIES_AMOUNT, loadPokemonList, loadPokemonListByQuery } from '../graphQL/queries';
import { getQueryParams, mapPokemonList } from '../utils';
import { setPokemonList, updatePokemonList } from '../store/list/slice';
import { selectPokemonList } from '../store/list/selectors';

import { PokedexDashboard, PokemonCard, SearchBar, LoadingIcon } from '../components';
import { PokemonDashboardProvider } from '../store/context/PokedexDashboardContext';

type TQueryParams = {
  offset: number;
  limit: number;
}

const BASE_LIMIT = 15;
const offset = 0;
const limit = 0;
const calculateQueryParams = getQueryParams(BASE_LIMIT);

export const Pokedex = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useState<TQueryParams>(calculateQueryParams( limit, offset ));
  const [inputValue, setInputValue] = useState('');
  const [shouldShowCard, setShouldShowCard] = useState( true )
  const scrollRef = useRef<HTMLDivElement | null>( null );
  const pokemonList = useSelector( selectPokemonList );

  const onScroll = () => {
    if ( !inputValue ) {
      if ( scrollRef.current
        && Math.ceil(scrollRef.current.scrollTop + scrollRef.current.offsetHeight) >= scrollRef.current.scrollHeight - 1.5 ) {
          if ( !pokemonList.find( ( { id }) => id === KANTO_ENTRIES_AMOUNT) ) {
            setParams( calculateQueryParams( params.limit, params.offset ) );
          }
        }
    }
  };

  const onInputChange = (e: any) => {
    setInputValue( e.target.value );
  };

  useEffect( () => {
    if ( !inputValue ) {
      setParams( calculateQueryParams( limit, offset ) );
      dispatch( setPokemonList( [] ) );
    }
  }, [inputValue, dispatch] );

  const { data: pokemonListData, loading } = useQuery(
    inputValue
    ? loadPokemonListByQuery( inputValue )
    : loadPokemonList( params.limit, params.offset )
  );

  useEffect(() => {
    if (pokemonListData) {
      const { pokemon_v2_pokemon: pokemons } = pokemonListData;
      const pokemonList = mapPokemonList( pokemons );
      dispatch( inputValue ? setPokemonList( pokemonList ) : updatePokemonList( pokemonList ) );
    }
  }, [pokemonListData, dispatch, inputValue]);

  return (
    <PokemonDashboardProvider shouldShowCard={shouldShowCard} setShouldShowCard={setShouldShowCard}>
      <div className='pokedex'>
        <SearchBar value={inputValue} onChange={onInputChange} />
        {loading && !pokemonList.length && <LoadingIcon className='center' />}
        {!!pokemonList.length && <PokedexDashboard ref={scrollRef} onScroll={onScroll}/>}
        <LoadingIcon />
        <PokemonCard />
      </div>
    </PokemonDashboardProvider>
  )
};

