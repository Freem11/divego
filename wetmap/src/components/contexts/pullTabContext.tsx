import React, { createContext, useState } from 'react';

type PullTabContextType = {
  showFilterer:    boolean
  setShowFilterer: React.Dispatch<React.SetStateAction<boolean>>
};

export const PullTabContext = createContext<PullTabContextType>({} as PullTabContextType);

const PullTabContextProvider = ({ children }: any) => {
  const [showFilterer, setShowFilterer] = useState<boolean>(false);

  return (
    <PullTabContext.Provider value={{ showFilterer, setShowFilterer }}>
      {children}
    </PullTabContext.Provider>
  );
};

export default PullTabContextProvider;
