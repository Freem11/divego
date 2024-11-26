import React, { createContext, useState } from 'react';

type DiveSitesContextType = {
  divesTog:    boolean
  setDivesTog: React.Dispatch<React.SetStateAction<boolean>>
};

const DiveSitesContextState = {
  divesTog:      true,
  setDivesTog: () => {},
};

export const DiveSitesContext = createContext<DiveSitesContextType>(
  DiveSitesContextState,
);

const DiveSitesContextProvider = ({ children }: any) => {
  const [divesTog, setDivesTog] = useState<boolean>(true);

  return (
    <DiveSitesContext.Provider value={{ divesTog, setDivesTog }}>
      {children}
    </DiveSitesContext.Provider>
  );
};

export default DiveSitesContextProvider;
