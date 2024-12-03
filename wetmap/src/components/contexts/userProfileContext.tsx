import React, { createContext, useState } from 'react';
import { ActiveProfile } from '../../entities/profile';

type UserProfileContextType = {
  profile:    ActiveProfile | null
  setProfile: React.Dispatch<React.SetStateAction<ActiveProfile | null>>
};

const UserProfileContextState = {
  profile:      null,
  setProfile: () => {},
};

export const UserProfileContext = createContext<UserProfileContextType>(
  UserProfileContextState,
);

const UserProfileContextProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<ActiveProfile | null>(null);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
