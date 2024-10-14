import { createContext, useState } from 'react';

export const MapBoundsContext = createContext('');

const MapBoundsContextProvider = ({ children }) => {
  const [boundaries, setBoundaries] = useState(null);

  return (
    <MapBoundsContext.Provider value={{ boundaries, setBoundaries }}>
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
