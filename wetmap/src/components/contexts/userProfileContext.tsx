import React, { createContext, useState } from 'react';
import { ActiveProfile } from '../../entities/profile';

type UserProfileContextType = {
  profile:    ActiveProfile | null
  setProfile: React.Dispatch<React.SetStateAction<ActiveProfile | null>>
};

export const UserProfileContext = createContext<UserProfileContextType>({} as UserProfileContextType);

const UserProfileContextProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<ActiveProfile | null>(null);

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
