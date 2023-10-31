import React, { createContext, useContext, useMemo, PropsWithChildren } from 'react';

export interface IPokemonDashboardProps {
  shouldShowCard: boolean;
  setShouldShowCard: ( value: boolean ) => void;
}

const defaultContext: IPokemonDashboardProps = {
  shouldShowCard: true,
  setShouldShowCard: () => {},
};

const PokemonDashboard = createContext<IPokemonDashboardProps>( defaultContext );

export const PokemonDashboardProvider = ( {
  shouldShowCard = defaultContext.shouldShowCard,
  setShouldShowCard = defaultContext.setShouldShowCard,
  ...rest
}: PropsWithChildren<IPokemonDashboardProps> ) => {
  const value = useMemo(
    () => ( {
      ...defaultContext,
      shouldShowCard,
      setShouldShowCard,
    } ),
    [setShouldShowCard, shouldShowCard]
  );

  return <PokemonDashboard.Provider value={value} {...rest} />;
};

export const usePokemonDashboard = () => useContext( PokemonDashboard );
