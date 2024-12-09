import React, { createContext, useState } from 'react';

type DiveSitesContextType = {
  divesTog:    boolean
  setDivesTog: React.Dispatch<React.SetStateAction<boolean>>
};

export const DiveSitesContext = createContext<DiveSitesContextType>({} as DiveSitesContextType);

const DiveSitesContextProvider = ({ children }: any) => {
  const [divesTog, setDivesTog] = useState<boolean>(true);

  return (
    <DiveSitesContext.Provider value={{ divesTog, setDivesTog }}>
      {children}
    </DiveSitesContext.Provider>
  );
};

export default DiveSitesContextProvider;
