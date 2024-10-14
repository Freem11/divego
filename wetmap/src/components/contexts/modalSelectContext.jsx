import { createContext, useState } from 'react';

export const ModalSelectContext = createContext('');

const ModalSelectContextProvider = ({ children }) => {
  const [chosenModal, setChosenModal] = useState(null);

  return (
    <ModalSelectContext.Provider value={{ chosenModal, setChosenModal }}>
      {children}
    </ModalSelectContext.Provider>
  );
};

export default ModalSelectContextProvider;
