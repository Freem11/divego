import React, { createContext, useState } from 'react';
import { LatLngObject } from '../googleMap/types';

type PinSpotContextType = {
  dragPin:    LatLngObject | null
  setDragPin: React.Dispatch<React.SetStateAction<LatLngObject | null>>
};

const PinSpotContextState = {
  dragPin:     null,
  setDragPin: () => {},
};

export const PinSpotContext = createContext<PinSpotContextType>(
  PinSpotContextState,
);

const PinSpotContextProvider = ({ children }: any) => {
  const [dragPin, setDragPin] = useState<LatLngObject | null>(null);

  return (
    <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
      {children}
    </PinSpotContext.Provider>
  );
};

export default PinSpotContextProvider;
