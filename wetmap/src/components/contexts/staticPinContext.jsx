import { createContext, useState } from 'react';

export const PinContext = createContext('');

const PinContextProvider = ({ children }) => {
  const [pin, setPin] = useState({
    PicFile:   '',
    Animal:    '',
    PicDate:   '',
    Latitude:  '',
    Longitude: '',
    UserID:    '',
  });

  return (
    <PinContext.Provider value={{ pin, setPin }}>
      {children}
    </PinContext.Provider>
  );
};

export default PinContextProvider;
