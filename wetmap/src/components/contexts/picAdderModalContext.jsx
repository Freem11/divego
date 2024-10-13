import { createContext, useState } from 'react';

export const PicAdderModalContext = createContext('');

const PicAdderModalContextProvider = ({ children }) => {
  const [picAdderModal, setPicAddermodal] = useState(false);

  return (
    <PicAdderModalContext.Provider value={{ picAdderModal, setPicAddermodal }}>
      {children}
    </PicAdderModalContext.Provider>
  );
};

export default PicAdderModalContextProvider;
