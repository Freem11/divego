import React, { createContext, useState } from 'react';
import { Photo } from '../../entities/photos';

type AreaPicsContextType = {
  areaPics:    Photo[]
  setAreaPics: React.Dispatch<React.SetStateAction<Photo[]>>
};

export const AreaPicsContext = createContext<AreaPicsContextType>({} as AreaPicsContextType);

const AreaPicsContextProvider = ({ children }: any) => {
  const [areaPics, setAreaPics] = useState<Photo[]>([]);

  return (
    <AreaPicsContext.Provider value={{ areaPics, setAreaPics }}>
      {children}
    </AreaPicsContext.Provider>
  );
};

export default AreaPicsContextProvider;
