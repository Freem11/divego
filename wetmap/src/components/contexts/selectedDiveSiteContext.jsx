import { createContext, useState } from 'react';

export const SelectedDiveSiteContext = createContext('');

const SelectedDiveSiteContextProvider = ({ children }) => {
  const [selectedDiveSite, setSelectedDiveSite] = useState({
    SiteName:  '',
    Latitude:  '',
    Longitude: '',
    UserID:    '',
    userName:  '',
  });

  return (
    <SelectedDiveSiteContext.Provider value={{ selectedDiveSite, setSelectedDiveSite }}>
      {children}
    </SelectedDiveSiteContext.Provider>
  );
};

export default SelectedDiveSiteContextProvider;
