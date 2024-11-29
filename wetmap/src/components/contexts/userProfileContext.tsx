import React, { createContext, useState } from 'react';
import { ActiveProfile } from '../../entities/profile';

type UserProfileContextType = {
  profile:    ActiveProfile
  setProfile: React.Dispatch<React.SetStateAction<ActiveProfile>>
};

const UserProfileContextState = {
  profile:      {
    id:                   0,
    created_at:           '',
    UserName:             '',
    Email:                '',
    UserID:               '',
    expo_push_token:      [],
    feedbackRequested:    false,
    getAdminNotification: false,
    partnerAccount:       false,
    profileBio:           null,
    profilePhoto:         '',
  },
  setProfile: () => {},
};

export const UserProfileContext = createContext<UserProfileContextType>(
  UserProfileContextState,
);

const UserProfileContextProvider = ({ children }: any) => {
  const [profile, setProfile] = useState<ActiveProfile>({
    id:                   0,
    created_at:           '',
    UserName:             '',
    Email:                '',
    UserID:               '',
    expo_push_token:      [],
    feedbackRequested:    false,
    getAdminNotification: false,
    partnerAccount:       false,
    profileBio:           null,
    profilePhoto:         '',
  });

  return (
    <UserProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export default UserProfileContextProvider;
