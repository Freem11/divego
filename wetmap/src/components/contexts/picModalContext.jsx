import { createContext, useState } from 'react';

export const PicModalContext = createContext('');

const PicModalContextProvider = ({ children }) => {
  const [picModal, setPicModal] = useState(false);

  return (
    <PicModalContext.Provider value={{ picModal, setPicModal }}>
      {children}
    </PicModalContext.Provider>
  );
};

export default PicModalContextProvider;
