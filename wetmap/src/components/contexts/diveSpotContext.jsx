import { createContext, useState } from 'react';

export const DiveSpotContext = createContext('');

const DiveSpotContextProvider = ({ children }) => {
  const [addSiteVals, setAddSiteVals] = useState({
    Site:      '',
    Latitude:  '',
    Longitude: '',
    UserID:    '',
  });

  return (
    <DiveSpotContext.Provider value={{ addSiteVals, setAddSiteVals }}>
      {children}
    </DiveSpotContext.Provider>
  );
};

export default DiveSpotContextProvider;
