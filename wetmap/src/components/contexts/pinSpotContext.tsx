import React, { createContext, useState } from 'react';
import { LatLngObject } from '../googleMap/types';

type PinSpotContextType = {
  dragPin:    LatLngObject
  setDragPin: React.Dispatch<React.SetStateAction<LatLngObject>>
};

const PinSpotContextState = {
  dragPin:     { lat: 0, lng: 0 },
  setDragPin: () => {},
};

export const PinSpotContext = createContext<PinSpotContextType>(
  PinSpotContextState,
);

const PinSpotContextProvider = ({ children }: any) => {
  const [dragPin, setDragPin] = useState<LatLngObject>({ lat: 0, lng: 0 });

  return (
    <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
      {children}
    </PinSpotContext.Provider>
  );
};

export default PinSpotContextProvider;
