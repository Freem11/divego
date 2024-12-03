import React, { createContext, useState } from 'react';
import { ActiveSession } from '../../entities/session';

type SessionContextType = {
  activeSession:    ActiveSession | null
  setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>
};

const SessionContextState = {
  activeSession:      null,
  setActiveSession: () => {},
};

export const SessionContext = createContext<SessionContextType>(
  SessionContextState,
);

const SessionContextProvider = ({ children }: any) => {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  return (
    <SessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
