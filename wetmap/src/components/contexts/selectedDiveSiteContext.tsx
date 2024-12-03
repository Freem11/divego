import React, { createContext, useState } from 'react';
import { DiveSiteWithUserName } from '../../entities/diveSite';

type SelectedShopContextType = {
  selectedDiveSite:    DiveSiteWithUserName | null
  setSelectedDiveSite: React.Dispatch<React.SetStateAction<DiveSiteWithUserName | null>>
};

const SelectedDiveSiteContextState = {
  selectedDiveSite:      null,
  setSelectedDiveSite: () => {},
};

export const SelectedDiveSiteContext = createContext<SelectedShopContextType>(
  SelectedDiveSiteContextState,
);

const SelectedDiveSiteContextProvider = ({ children }: any) => {
  const [selectedDiveSite, setSelectedDiveSite] = useState<DiveSiteWithUserName | null>(null);

  return (
    <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
      {children}
    </SelectedDiveSiteContext.Provider>
  );
};

export default SelectedDiveSiteContextProvider;
