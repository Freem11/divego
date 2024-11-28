import React, { createContext, useState } from 'react';

type PullTabContextType = {
  showFilterer:    boolean
  setShowFilterer: React.Dispatch<React.SetStateAction<boolean>>
};

const PullTabContextState = {
  showFilterer:     false,
  setShowFilterer: () => {},
};

export const PullTabContext = createContext<PullTabContextType>(
  PullTabContextState,
);

const PullTabContextProvider = ({ children }: any) => {
  const [showFilterer, setShowFilterer] = useState<boolean>(false);

  return (
    <PullTabContext.Provider value={{ showFilterer, setShowFilterer }}>
      {children}
    </PullTabContext.Provider>
  );
};

export default PullTabContextProvider;
