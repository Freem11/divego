import { createContext, useState } from 'react';

export const SelectedProfileContext = createContext('');

const SelectedProfileContextProvider = ({ children }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);

  return (
    <SelectedProfileContext.Provider value={{ selectedProfile, setSelectedProfile }}>
      {children}
    </SelectedProfileContext.Provider>
  );
};

export default SelectedProfileContextProvider;
