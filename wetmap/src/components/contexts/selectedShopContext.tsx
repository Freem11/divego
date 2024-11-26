import React, { createContext, useState } from 'react';
import { DiveShop } from '../../entities/diveShop';

type SelectedShopContextType = {
  selectedShop:    DiveShop
  setSelectedShop: React.Dispatch<React.SetStateAction<DiveShop>>
};

const SelectedShopContextState = {
  selectedShop:      {
    id:                   0,
    orgName:              '',
    lat:                  0,
    lng:                  0,
    userId:               '',
    created_at:           '',
    diveShopBio:          '',
    diveShopProfilePhoto: '',

  },
  setSelectedShop: () => {},
};

export const SelectedShopContext = createContext<SelectedShopContextType>(
  SelectedShopContextState,
);

const SelectedShopContextProvider = ({ children }: any) => {
  const [selectedShop, setSelectedShop] = useState<DiveShop>({
    id:                   0,
    orgName:              '',
    lat:                  0,
    lng:                  0,
    userId:               '',
    created_at:           '',
    diveShopBio:          '',
    diveShopProfilePhoto: '',
  });

  return (
    <SelectedShopContext.Provider value={{ selectedShop, setSelectedShop }}>
      {children}
    </SelectedShopContext.Provider>
  );
};

export default SelectedShopContextProvider;
