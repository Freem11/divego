import { createContext, useState } from 'react';

export const PinSpotContext = createContext('');

const PinSpotContextProvider = ({ children }) => {
  const [dragPin, setDragPin] = useState({});

  return (
    <PinSpotContext.Provider value={{ dragPin, setDragPin }}>
      {children}
    </PinSpotContext.Provider>
  );
};

export default PinSpotContextProvider;
