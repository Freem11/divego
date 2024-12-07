import React, { createContext, useState } from 'react';

type MapBoundsContextType = {
  boundaries:    number[] | null
  setBoundaries: React.Dispatch<React.SetStateAction<number[] | null>>
};

export const MapBoundsContext = createContext<MapBoundsContextType>({} as MapBoundsContextType);

const MapBoundsContextProvider = ({ children }: any) => {
  const [boundaries, setBoundaries] = useState<number[] | null>(null);

  return (
    <MapBoundsContext.Provider value={{ boundaries, setBoundaries }}>
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
