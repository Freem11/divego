import React, { createContext, useState } from 'react';
import { Photo } from '../../entities/photos';

type SelectedPictureContextType = {
  selectedPicture:    Photo | null
  setSelectedPicture: React.Dispatch<React.SetStateAction<Photo | null>>
};

const SelectedPictureContextState = {
  selectedPicture:    null,
  setSelectedPicture: () => {},
};

export const SelectedPictureContext = createContext<SelectedPictureContextType>(
  SelectedPictureContextState,
);

const SelectedPictureContextProvider = ({ children }: any) => {
  const [selectedPicture, setSelectedPicture] = useState<Photo | null>(null);

  return (
    <SelectedPictureContext.Provider value={{ selectedPicture, setSelectedPicture }}>
      {children}
    </SelectedPictureContext.Provider>
  );
};

export default SelectedPictureContextProvider;
