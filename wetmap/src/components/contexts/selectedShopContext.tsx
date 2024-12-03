import React, { createContext, useState } from 'react';
import { DiveShop } from '../../entities/diveShop';

type SelectedShopContextType = {
  selectedShop:    DiveShop | null
  setSelectedShop: React.Dispatch<React.SetStateAction<DiveShop | null>>
};

const SelectedShopContextState = {
  selectedShop:      null,
  setSelectedShop: () => {},
};

export const SelectedShopContext = createContext<SelectedShopContextType>(
  SelectedShopContextState,
);

const SelectedShopContextProvider = ({ children }: any) => {
  const [selectedShop, setSelectedShop] = useState<DiveShop | null>(null);

  return (
    <SelectedShopContext.Provider value={{ selectedShop, setSelectedShop }}>
      {children}
    </SelectedShopContext.Provider>
  );
};

export default SelectedShopContextProvider;
