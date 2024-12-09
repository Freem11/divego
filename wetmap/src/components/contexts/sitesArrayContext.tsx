import React, { createContext, useState } from 'react';

type SitesArrayContextType = {
  sitesArray:    number[]
  setSitesArray: React.Dispatch<React.SetStateAction<number[]>>
};

export const SitesArrayContext = createContext<SitesArrayContextType>({} as SitesArrayContextType);

const SitesArrayContextProvider = ({ children }: any) => {
  const [sitesArray, setSitesArray] = useState<number[]>([]);

  return (
    <SitesArrayContext.Provider value={{ sitesArray, setSitesArray }}>
      {children}
    </SitesArrayContext.Provider>
  );
};

export default SitesArrayContextProvider;
