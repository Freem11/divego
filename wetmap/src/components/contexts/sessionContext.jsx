import { createContext, useState } from 'react';

export const SessionContext = createContext('');

const SessionContextProvider = ({ children }) => {
  const [activeSession, setActiveSession] = useState(null);

  return (
    <SessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
