import React, { createContext, useState } from 'react';
import { PhotoSubmission } from '../../entities/photoSubmission';

type PinContextType = {
  pin:    PhotoSubmission
  setPin: React.Dispatch<React.SetStateAction<PhotoSubmission>>
};

const PinContextState = {
  pin:      {
    PicFile:   '',
    Animal:    '',
    PicDate:   '',
    Latitude:  0,
    Longitude: 0,
    siteName:  '',
    UserID:    '',
  },
  setPin: () => {},
};

export const PinContext = createContext<PinContextType>(
  PinContextState,
);

const PinContextProvider = ({ children }: any) => {
  const [pin, setPin] = useState({
    PicFile:   '',
    Animal:    '',
    PicDate:   '',
    Latitude:  0,
    Longitude: 0,
    siteName:  '',
    UserID:    '',
  });

  return (
    <PinContext.Provider value={{ pin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};

export default PinContextProvider;
