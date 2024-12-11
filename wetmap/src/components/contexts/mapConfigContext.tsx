import React, { createContext, useState } from 'react';

type MapConfigContextType = {
  mapConfig:    number
  setMapConfig: React.Dispatch<React.SetStateAction<number>>
};

export const MapConfigContext = createContext<MapConfigContextType>({} as MapConfigContextType);

const MapConfigContextProvider = ({ children }: any) => {
  const [mapConfig, setMapConfig] = useState<number>(0);

  return (
    <MapConfigContext.Provider value={{ mapConfig, setMapConfig }}>
      {children}
    </MapConfigContext.Provider>
  );
};

export default MapConfigContextProvider;
