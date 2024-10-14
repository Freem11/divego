import { createContext, useState } from 'react';

export const MapSearchModalContext = createContext('');

const MapSearchModalContextProvider = ({ children }) => {
  const [mapSearchModal, setMapSearchModal] = useState(false);

  return (
    <MapSearchModalContext.Provider value={{ mapSearchModal, setMapSearchModal }}>
      {children}
    </MapSearchModalContext.Provider>
  );
};

export default MapSearchModalContextProvider;
