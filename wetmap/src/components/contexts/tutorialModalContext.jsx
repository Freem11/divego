import { createContext, useState } from 'react';

export const TutorialModelContext = createContext('');

const TutorialModalContextProvider = ({ children }) => {
  const [guideModal, setGuideModal] = useState(false);

  return (
    <TutorialModelContext.Provider value={{ guideModal, setGuideModal }}>
      {children}
    </TutorialModelContext.Provider>
  );
};

export default TutorialModalContextProvider;
