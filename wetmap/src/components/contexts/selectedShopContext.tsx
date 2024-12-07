import React, { createContext, useState } from 'react';
import { DiveShop } from '../../entities/diveShop';

type SelectedShopContextType = {
  selectedShop:    DiveShop | null
  setSelectedShop: React.Dispatch<React.SetStateAction<DiveShop | null>>
};

export const SelectedShopContext = createContext<SelectedShopContextType>({} as SelectedShopContextType);

const SelectedShopContextProvider = ({ children }: any) => {
  const [selectedShop, setSelectedShop] = useState<DiveShop | null>(null);

  return (
    <SelectedShopContext.Provider value={{ selectedShop, setSelectedShop }}>
      {children}
    </SelectedShopContext.Provider>
  );
};

export default SelectedShopContextProvider;
