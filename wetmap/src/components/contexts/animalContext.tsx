import React, { createContext, useState } from 'react';

type AnimalContextType = {
  animalVal:    string[]
  setAnimalVal: React.Dispatch<React.SetStateAction<string[]>>
};

const AnimalContextState = {
  animalVal:      [],
  setAnimalVal: () => {},
};

export const AnimalContext = createContext<AnimalContextType>(
  AnimalContextState,
);


const AnimalContextProvider = ({ children }: any) => {
  const [animalVal, setAnimalVal] = useState<string[]>([]);

  return (
    <AnimalContext.Provider value={{ animalVal, setAnimalVal }}>
      {children}
    </AnimalContext.Provider>
  );
};

export default AnimalContextProvider;
