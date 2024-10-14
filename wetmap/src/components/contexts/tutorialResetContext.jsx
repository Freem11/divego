import { createContext, useState } from 'react';

export const TutorialResetContext = createContext('');

const TutorialResetContextProvider = ({ children }) => {
  const [tutorialReset, setTutorialReset] = useState(false);

  return (
    <TutorialResetContext.Provider value={{ tutorialReset, setTutorialReset }}>
      {children}
    </TutorialResetContext.Provider>
  );
};

export default TutorialResetContextProvider;
