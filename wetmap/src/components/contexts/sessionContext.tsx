import React, { createContext, useState } from 'react';
import { ActiveSession } from '../../entities/session';

type SessionContextType = {
  activeSession:    ActiveSession | null
  setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>
};

const SessionContextState = {
  activeSession:      {
    access_token:  '',
    expires_at:    0,
    expires_in:    0,
    refresh_token: '',
    token_type:    '',
    user:          {
      app_metadata:       {
        provider:  '',
        providers: [],
      },
      aud:                '',
      confirmed_at:       '',
      created_at:         '',
      email:              '',
      email_confirmed_at: '',
      id:                 '',
      identities:         [],
      is_anonymous:       false,
      last_sign_in_at:    '',
      phone:              '',
      role:               '',
      updated_at:         '',
      user_metadata:      {},
    },
  },
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
