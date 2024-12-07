import React, { createContext, useState } from 'react';
import { HeatPoint } from '../googleMap/types';

type HeatPointsContextType = {
  heatpts:    HeatPoint[]
  setHeatPts: React.Dispatch<React.SetStateAction<HeatPoint[]>>
};

export const HeatPointsContext = createContext<HeatPointsContextType>({} as HeatPointsContextType);

const HeatPointsContextProvider = ({ children }: any) => {
  const [heatpts, setHeatPts] = useState<HeatPoint[]>([]);

  return (
    <HeatPointsContext.Provider value={{ heatpts, setHeatPts }}>
      {children}
    </HeatPointsContext.Provider>
  );
};

export default HeatPointsContextProvider;
