import { createContext, useState } from 'react';

export const ReverseContext = createContext('');

const ReverseContextProvider = ({ children }) => {
  const [movingBack, setMovingBack] = useState(false);

  return (
    <ReverseContext.Provider value={{ movingBack, setMovingBack }}>
      {children}
    </ReverseContext.Provider>
  );
};

export default ReverseContextProvider;
