import React, { createContext, useState } from 'react';

type PictureContextType = {
  photoFile:    string | null
  setPhotoFile: React.Dispatch<React.SetStateAction<string | null>>
};

const PictureContextState = {
  photoFile:      null,
  setPhotoFile: () => {},
};

export const PictureContext = createContext<PictureContextType>(
  PictureContextState,
);


const PictureContextProvider = ({ children }: any) => {
  const [photoFile, setPhotoFile] = useState<string | null>(null);

  return (
    <PictureContext.Provider value={{ photoFile, setPhotoFile }}>
      {children}
    </PictureContext.Provider>
  );
};

export default PictureContextProvider;
