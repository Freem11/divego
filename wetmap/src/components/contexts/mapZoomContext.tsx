import React, { createContext, useState } from 'react';

type ZoomContextType = {
  mapZoom:    number
  setMapZoom: React.Dispatch<React.SetStateAction<number>>
};

export const ZoomContext = createContext<ZoomContextType>({} as ZoomContextType);

const ZoomContextProvider = ({ children }: any) => {
  const [mapZoom, setMapZoom] = useState<number>(10);

  return (
    <ZoomContext.Provider value={{ mapZoom, setMapZoom }}>
      {children}
    </ZoomContext.Provider>
  );
};

export default ZoomContextProvider;
