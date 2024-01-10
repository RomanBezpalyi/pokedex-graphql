import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import cn from 'classnames';

import { selectActivePokemon, selectActivePokemonId } from '../../store/pokemon/selectors';
import { setActivePokemonId, setPokemon } from '../../store/pokemon/slice';
import { loadPokemon } from '../../graphQL/queries';
import { TYPE_COLORS, STAT_MAPPER, mapPokemon, STAT_COLORS } from '../../utils';
import { selectGeneralStats } from '../../store/stats/selectors';
import { selectTypes } from '../../store/types/selectors';
import { usePokemonDashboard } from '../../store/context/PokedexDashboardContext';

import { SPRITE_URL, GIF_URL } from '../../api/constants';
import noPokemon from './no-pokemon-selected-image.png';

import css from './PokemonCard.module.scss';

export const PokemonCard = () => {
  const { shouldShowCard, setShouldShowCard } = usePokemonDashboard();
  const dispatch = useDispatch();
  const stats = useSelector(selectGeneralStats);
  const pokemonTypes = useSelector(selectTypes);
  const activePokemonId = useSelector(selectActivePokemonId);
  const activePokemon = useSelector(selectActivePokemon);

  const onImageClick = (id: number) => {
    if (activePokemon!.id !== id) {
      dispatch(setActivePokemonId(id));
      setShouldShowCard(false);
    }
  };

  const { data: pokemonData } = useQuery(loadPokemon(activePokemonId), { context: { clientName: 'pokeapi' } });

  useEffect(() => {
    if (pokemonData) {
      const { pokemon_v2_pokemon: pokemon } = pokemonData;
      setTimeout(() => {
        dispatch(setPokemon(mapPokemon(pokemon)[0]));
        setShouldShowCard(true);
      }, 200);
    }
  }, [pokemonData, dispatch, setShouldShowCard]);

  return (
    <div className={cn(css.pokemonCard, { [css.slideIn]: activePokemon && shouldShowCard, [css.slideOut]: !shouldShowCard })}>
      <img alt={activePokemon ? activePokemon.name : 'No pokemon'} className={css.pokemon} src={activePokemon ? `${GIF_URL}${activePokemon.id}.gif` : noPokemon} />
      {!activePokemon && (<>
        <p className={css.cardInfo}>Select a Pokemon to see the data about it.</p>
      </>)}
      {activePokemon && (<>
        <span className={css.number}>N° {activePokemon.id}</span>
        <h3 className={css.name}>{activePokemon.name.replace('-', ' ')}</h3>
        <div>{activePokemon.types?.map((type) => [pokemonTypes.find(({ id }) => id === type)].map((type) => <span
          key={`${activePokemon.id}-${type?.name}`}
          className={css.type}
          style={{ background: TYPE_COLORS[type?.name as keyof typeof TYPE_COLORS] }}
        >
          {type?.name}
        </span>))
        }
        </div>
        <div>
          <h4 className={css.title}>Pokédex Entry</h4>
          <p className={css.description}>{activePokemon.description}</p>
        </div>
        <div className={css.parameters}>
          <div className={css.parameter}>
            <h4 className={css.title}>Height</h4>
            <span className={css.value}>{(activePokemon.height * 0.1).toFixed(1)}m</span>
          </div>
          <div className={css.parameter}>
            <h4 className={css.title}>Weight</h4>
            <span className={css.value}>{activePokemon.weight / 10}kg</span>
          </div>
        </div>
        <div className={css.abilitiesWrapper}>
          <h4 className={css.title}>Abilities</h4>
          <div className={css.abilities}>
            {activePokemon.abilities!.map(({ name, id }) =>
              <span key={id} className={css.value}>{name}</span>
            )}
          </div>
        </div>
        <div className={css.statsWrapper}>
          <h4 className={css.title}>Stats</h4>
          <div className={css.stats}>
            {stats.map(({ name, id }) =>
              <div key={id} className={css.stat}>
                <h4 className={css.statTitle} style={{ background: STAT_COLORS[name as keyof typeof STAT_COLORS] }}>{STAT_MAPPER[name as keyof typeof STAT_MAPPER]}</h4>
                <span>{activePokemon.stats!.find(({ id: statId }) => id === statId)!.value}</span>
              </div>
            )}
          </div>
        </div>
        <div>
          <h4 className={css.title}>Evolution</h4>
          <div className={css.evolution}>
            {activePokemon.evolutionLine!.map(({ id, minLevel }, idx) =>
              <React.Fragment key={id}>
                {idx > 0 && <div className={css.evolutionLevel}>{minLevel ? 'Lv. ' + minLevel : '?'}</div>}
                <div onClick={() => onImageClick(id)} className={css.sprite}>
                  <img alt={`Pokemon ${id}`} src={`${SPRITE_URL}${id}.png`} />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </>)}
    </div>
  )
};
