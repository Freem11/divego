import React, { createContext, useState } from 'react';
import { DiveShop } from '../../entities/diveShop';

type SelectedShopContextType = {
  selectedShop:    DiveShop
  setSelectedShop: React.Dispatch<React.SetStateAction<DiveShop>>
};

const SelectedShopContextState = {
  selectedShop:      {
    id:                   0,
    orgname:              '',
    lat:                  0,
    lng:                  0,
    userid:               '',
    created_at:           '',
    diveshopbio:          '',
    diveshopprofilephoto: '',

  },
  setSelectedShop: () => {},
};

export const SelectedShopContext = createContext<SelectedShopContextType>(
  SelectedShopContextState,
);

const SelectedShopContextProvider = ({ children }: any) => {
  const [selectedShop, setSelectedShop] = useState<DiveShop>({
    id:                   0,
    orgname:              '',
    lat:                  0,
    lng:                  0,
    userid:               '',
    created_at:           '',
    diveshopbio:          '',
    diveshopprofilephoto: '',
  });

  return (
    <SelectedShopContext.Provider value={{ selectedShop, setSelectedShop }}>
      {children}
    </SelectedShopContext.Provider>
  );
};

export default SelectedShopContextProvider;
