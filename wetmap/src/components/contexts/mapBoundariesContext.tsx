import React, { createContext, useState } from 'react';

type MapBoundsContextType = {
  boundaries:    number[] | null
  setBoundaries: React.Dispatch<React.SetStateAction<number[] | null>>
};

const MapBoundsContextState = {
  boundaries:      null,
  setBoundaries: () => {},
};

export const MapBoundsContext = createContext<MapBoundsContextType>(
  MapBoundsContextState,
);

const MapBoundsContextProvider = ({ children }: any) => {
  const [boundaries, setBoundaries] = useState<number[] | null>(null);

  return (
    <MapBoundsContext.Provider value={{ boundaries, setBoundaries }}>
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
