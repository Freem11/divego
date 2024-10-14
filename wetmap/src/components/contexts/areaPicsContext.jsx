import { createContext, useState } from 'react';

export const AreaPicsContext = createContext('');

const AreaPicsContextProvider = ({ children }) => {
  const [areaPics, setAreaPics] = useState([]);

  return (
    <AreaPicsContext.Provider value={{ areaPics, setAreaPics }}>
      {children}
    </AreaPicsContext.Provider>
  );
};

export default AreaPicsContextProvider;
