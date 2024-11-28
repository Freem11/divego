import React, { createContext, useState } from 'react';
import { Photo } from '../../entities/photos';

type SelectedPictureContextType = {
  selectedPicture:    Photo
  setSelectedPicture: React.Dispatch<React.SetStateAction<Photo>>
};

const SelectedPictureContextState = {
  selectedPicture: {
    id:         0,
    created_at: '',
    photoFile:  '',
    label:      '',
    dateTaken:  '',
    latitude:   0,
    longitude:  0,
    month:      0,
    UserID:     '',
    UserName:   '',
  },
  setSelectedPicture: () => {},
};

export const SelectedPictureContext = createContext<SelectedPictureContextType>(
  SelectedPictureContextState,
);

const SelectedPictureContextProvider = ({ children }: any) => {
  const [selectedPicture, setSelectedPicture] = useState<Photo>({
    id:         0,
    created_at: '',
    photoFile:  '',
    label:      '',
    dateTaken:  '',
    latitude:   0,
    longitude:  0,
    month:      0,
    UserID:     '',
    UserName:   '',
  });

  return (
    <SelectedPictureContext.Provider value={{ selectedPicture, setSelectedPicture }}>
      {children}
    </SelectedPictureContext.Provider>
  );
};

export default SelectedPictureContextProvider;
