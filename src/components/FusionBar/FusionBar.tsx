import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';

import { FusionSelect } from './FusionSelect';

import { selectPokemonById, selectPokemonList } from '../../store/list/selectors';
import { mapFusionList, mapPokemonList, mapPokemonListToSelectOptions } from '../../utils';
import { getNewPokemonRequestData } from '../../utils/requestHelpers';
import { loadPokemonList } from '../../graphQL/queries';
import { createPokemonFusion } from '../../graphQL/mutations';
import { setPokemonList } from '../../store/list/slice';
import { updateFusionList } from '../../store/fusionList/slice';

import css from './FusionBar.module.scss';

export type TSelectOption = {
  value: number;
  label: string;
}

export type TFusionSelectProps = {
  options: TSelectOption[];
  value: TSelectOption;
  onChange: (e: any) => void;
  label: string;
}

export const FusionBar = () => {
  const dispatch = useDispatch();
  const pokemonList = useSelector(selectPokemonList);
  const options = mapPokemonListToSelectOptions(pokemonList);

  const [parent1, setParent1] = useState<TSelectOption>(options[0]);
  const [parent2, setParent2] = useState<TSelectOption>(options[1]);
  const [parent1Id, setParent1Id] = useState(0);
  const [parent2Id, setParent2Id] = useState(0);

  const parent1Data = useSelector(selectPokemonById(parent1Id));
  const parent2Data = useSelector(selectPokemonById(parent2Id));

  const [createPokemon, { error, data }] = useMutation(createPokemonFusion);

  const resetSelects = () => {
    setParent1(options[0]);
    setParent2(options[1]);
  }

  const handleCreatePokemon = () => {
    if (!parent1 || !parent2 || parent1.value === parent2.value) {
      toast.error('Select 2 different pokemons to fuse.')
      return;
    }
    const { stats, ...pokemonData } = getNewPokemonRequestData(parent1Data!, parent2Data!);
    createPokemon({
      variables: {
        ...pokemonData,
        ...stats
      }
    })
  };

  const { data: pokemonListData } = useQuery(
    loadPokemonList(), { context: { clientName: 'pokeapi' } }
  );

  useEffect(() => {
    if (parent1) {
      setParent1Id(parent1.value);
    }
  }, [parent1]);

  useEffect(() => {
    if (parent2) {
      setParent2Id(parent2.value);
    }
  }, [parent2]);

  useEffect(() => {
    if (pokemonListData) {
      const { pokemon_v2_pokemon: pokemons } = pokemonListData;
      const pokemonsToSet = mapPokemonList(pokemons);
      dispatch(setPokemonList(pokemonsToSet));
    }
  }, [pokemonListData, dispatch, pokemonList.length]);

  useEffect(() => {
    if (error) {
      resetSelects();
      toast.error('GraphQL error occured.')
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      resetSelects();
      const { createPokemon: newPokemon } = data;
      const mappedNewPokemon = mapFusionList([newPokemon]);
      dispatch(updateFusionList(mappedNewPokemon));
    }
  }, [data, dispatch]);

  return (
    <div className={css.wrapper}>
      <FusionSelect label='Pokémon 1' options={options} value={parent1} onChange={(value) => setParent1(value)} />
      <span className={css.plus}>+</span>
      <FusionSelect label='Pokémon 2' options={options} value={parent2} onChange={(value) => setParent2(value)} />
      <button onClick={handleCreatePokemon} className={css.button}>Create a Pokémon</button>
    </div>
  )
};
