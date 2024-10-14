import { createContext, useState } from 'react';

export const GuideLaunchModalContext = createContext('');

const GuideLaunchModalContextProvider = ({ children }) => {
  const [guideLaunchModal, setGuideLaunchModal] = useState(false);

  return (
    <GuideLaunchModalContext.Provider value={{ guideLaunchModal, setGuideLaunchModal }}>
      {children}
    </GuideLaunchModalContext.Provider>
  );
};

export default GuideLaunchModalContextProvider;
