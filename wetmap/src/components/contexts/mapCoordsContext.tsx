import React, { createContext, useState } from 'react';

type CoordsContextType = {
  mapCoords:    number[]
  setMapCoords: React.Dispatch<React.SetStateAction<number[]>>
};

const CoordsContextState = {
  mapCoords:      [],
  setMapCoords: () => {},
};

export const CoordsContext = createContext<CoordsContextType>(
  CoordsContextState,
);

const CoordsContextProvider = ({ children }: any) => {
  const [mapCoords, setMapCoords] = useState<number[]>([49.316666, -123.066666]);

  return (
    <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
      {children}
    </CoordsContext.Provider>
  );
};

export default CoordsContextProvider;
