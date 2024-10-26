import { createContext, useState } from 'react';

export const SecondTutorialModalContext = createContext('');

const SecondTutorialModalContextProvider = ({ children }) => {
  const [secondGuideModal, setSecondGuideModal] = useState(false);

  return (
    <SecondTutorialModalContext.Provider value={{ secondGuideModal, setSecondGuideModal }}>
      {children}
    </SecondTutorialModalContext.Provider>
  );
};

export default SecondTutorialModalContextProvider;
