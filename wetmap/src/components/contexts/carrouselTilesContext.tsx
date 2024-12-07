import React, { createContext, useState } from 'react';

type CarrouselTilesContextType = {
  tiles:    Boolean
  setTiles: React.Dispatch<React.SetStateAction<boolean>>
};

export const CarrouselTilesContext = createContext<CarrouselTilesContextType>({} as CarrouselTilesContextType);

const CarrouselTilesContextProvider = ({ children }: any) => {
  const [tiles, setTiles] = useState<boolean>(false);

  return (
    <CarrouselTilesContext.Provider value={{ tiles, setTiles }}>
      {children}
    </CarrouselTilesContext.Provider>
  );
};

export default CarrouselTilesContextProvider;
