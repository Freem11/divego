import React, { createContext, useState } from 'react';

type SitesArrayContextType = {
  sitesArray:    number[]
  setSitesArray: React.Dispatch<React.SetStateAction<number[]>>
};

const SitesArrayContextState = {
  sitesArray:      [],
  setSitesArray: () => {},
};

export const SitesArrayContext = createContext<SitesArrayContextType>(
  SitesArrayContextState,
);

const SitesArrayContextProvider = ({ children }: any) => {
  const [sitesArray, setSitesArray] = useState<number[]>([]);

  return (
    <SitesArrayContext.Provider value={{ sitesArray, setSitesArray }}>
      {children}
    </SitesArrayContext.Provider>
  );
};

export default SitesArrayContextProvider;
