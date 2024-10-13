import { createContext, useState } from 'react';

export const SelectedPictureContext = createContext('');

const SelectedPictureContextProvider = ({ children }) => {
  const [selectedPicture, setSelectedPicture] = useState(null);

  return (
    <SelectedPictureContext.Provider value={{ selectedPicture, setSelectedPicture }}>
      {children}
    </SelectedPictureContext.Provider>
  );
};

export default SelectedPictureContextProvider;
