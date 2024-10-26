import { createContext, useState } from 'react';

export const SettingsModalContext = createContext('');

const SettingsModalContextProvider = ({ children }) => {
  const [settingsModal, setSettingsModal] = useState(false);

  return (
    <SettingsModalContext.Provider value={{ settingsModal, setSettingsModal }}>
      {children}
    </SettingsModalContext.Provider>
  );
};

export default SettingsModalContextProvider;
