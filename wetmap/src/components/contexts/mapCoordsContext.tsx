import React, { createContext, useState } from 'react';

type CoordsContextType = {
  mapCoords:    number[]
  setMapCoords: React.Dispatch<React.SetStateAction<number[]>>
};

export const CoordsContext = createContext<CoordsContextType>({} as CoordsContextType);

const CoordsContextProvider = ({ children }: any) => {
  const [mapCoords, setMapCoords] = useState<number[]>([49.316666, -123.066666]);

  return (
    <CoordsContext.Provider value={{ mapCoords, setMapCoords }}>
      {children}
    </CoordsContext.Provider>
  );
};

export default CoordsContextProvider;
