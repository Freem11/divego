import { createContext, useState } from 'react';

export const SelectedShopContext = createContext('');

const SelectedShopContextProvider = ({ children }) => {
  const [selectedShop, setSelectedShop] = useState({
    id:      0,
    orgName: '',
    lat:     null,
    lng:     null,
  });

  return (
    <SelectedShopContext.Provider value={{ selectedShop, setSelectedShop }}>
      {children}
    </SelectedShopContext.Provider>
  );
};

export default SelectedShopContextProvider;
