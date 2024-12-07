import React, { createContext, useState } from 'react';
import { PhotoSubmission } from '../../entities/photoSubmission';

type PinContextType = {
  pin:    PhotoSubmission | null
  setPin: React.Dispatch<React.SetStateAction<PhotoSubmission | null>>
};

export const PinContext = createContext<PinContextType | null>({} as PinContextType);

const PinContextProvider = ({ children }: any) => {
  const [pin, setPin] = useState<PhotoSubmission | null>(null);

  return (
    <PinContext.Provider value={{ pin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};

export default PinContextProvider;
