import React, { createContext, useState } from 'react';
import { DiveSiteWithUserName } from '../../entities/diveSite';

type SelectedShopContextType = {
  selectedDiveSite:    DiveSiteWithUserName | null
  setSelectedDiveSite: React.Dispatch<React.SetStateAction<DiveSiteWithUserName | null>>
};

export const SelectedDiveSiteContext = createContext<SelectedShopContextType>({} as SelectedShopContextType);

const SelectedDiveSiteContextProvider = ({ children }: any) => {
  const [selectedDiveSite, setSelectedDiveSite] = useState<DiveSiteWithUserName | null>(null);

  return (
    <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
      {children}
    </SelectedDiveSiteContext.Provider>
  );
};

export default SelectedDiveSiteContextProvider;
