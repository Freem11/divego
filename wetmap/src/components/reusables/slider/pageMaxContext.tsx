import React, { createContext, useState } from 'react';

type PageMaxContextType = {
  pageMax:    number
  setPageMax: React.Dispatch<React.SetStateAction<number>>
};

const PageMaxContextState = {
  pageMax:      0,
  setPageMax: () => {},
};

export const PageMaxContext = createContext<PageMaxContextType>(
  PageMaxContextState,
);

const PageMaxContextProvider = ({ children }: any) => {
  const [pageMax, setPageMax] = useState<number>(1);

  return (
    <PageMaxContext.Provider value={{ pageMax, setPageMax }}>
      {children}
    </PageMaxContext.Provider>
  );
};

export default PageMaxContextProvider;

