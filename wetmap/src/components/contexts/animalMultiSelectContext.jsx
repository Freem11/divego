import { createContext, useState } from 'react';

export const AnimalMultiSelectContext = createContext('');

const AnimalMultiSelectContextProvider = ({ children }) => {
  const [animalMultiSelection, setAnimalMultiSelection] = useState([]);

  return (
    <AnimalMultiSelectContext.Provider value={{ animalMultiSelection, setAnimalMultiSelection }}>
      {children}
    </AnimalMultiSelectContext.Provider>
  );
};

export default AnimalMultiSelectContextProvider;
