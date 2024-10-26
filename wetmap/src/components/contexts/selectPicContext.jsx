import { createContext, useState } from 'react';

export const SelectedPicContext = createContext('');

const SelectedPicContextProvider = ({ children }) => {
  const [selectedPic, setSelectedPic] = useState(null);

  return (
    <SelectedPicContext.Provider value={{ selectedPic, setSelectedPic }}>
      {children}
    </SelectedPicContext.Provider>
  );
};

export default SelectedPicContextProvider;
