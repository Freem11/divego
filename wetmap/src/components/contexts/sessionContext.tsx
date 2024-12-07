import React, { createContext, useState } from 'react';
import { ActiveSession } from '../../entities/session';

type SessionContextType = {
  activeSession:    ActiveSession | null
  setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

const SessionContextProvider = ({ children }: any) => {
  const [activeSession, setActiveSession] = useState<ActiveSession | null>(null);

  return (
    <SessionContext.Provider value={{ activeSession, setActiveSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
