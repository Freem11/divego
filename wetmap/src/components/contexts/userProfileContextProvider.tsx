import React, { createContext, useEffect, useReducer, useRef, useState } from 'react';
import { ActiveProfile } from '../../entities/profile';
import { sessionCheck, signOut } from '../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile, grabProfileById } from '../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from './userProfileContext';

export type UserProfileContextType = {
  logout:             () => Promise<void>
  profile:            ActiveProfile | null
  initProfile:        (force?: boolean) => Promise<void>
  profileInitialized: boolean
};


export const UserProfileContextProvider = ({ children }: any) => {
  const initialized = useRef<boolean | null>(null);
  const [profile, setProfile] = useState<ActiveProfile | null>(null);
  const [profileInitialized, setProfileInitialized] = useState(false);

  const getSession = async () => {
    const session = await sessionCheck();
    console.log({ session });

    if (session.error) {
      console.log('Unable to initialize session', session.error);
      return null;
    }

    if (!session.data.session?.user.id) {
      return null;
    }

    return session.data.session;
  };

  const initProfile = async (force = false) => {
    console.log('call initProfile', initialized.current);

    if (force || initialized.current === null) {
      initialized.current = false;
      const session = await getSession();

      if (!session?.user.id) {
        // User is not signed in
        setProfileInitialized(true);
        return;
      }

      const profile = await grabProfileById(session.user.id);
      if (profile) {
        setProfile(profile);
      } else {
        const created = await createProfile({
          id:    session.user.id,
          email: session.user.email,
        });

        if (created.error) {
          console.log('Unable to create new profile for user ', session.user.id);
          return;
        }

        const profile = await grabProfileById(session.user.id);
        if (!profile) {
          console.log('Unable to fetch new profile');
          return;
        }
        setProfile(profile);
      }
      setProfileInitialized(true);
      initialized.current = true;
    }
  };

  const logout = async () => {
    // localStorage.removeItem('token');
    await signOut();
    setProfile(null);

    // allow initProfile to be called again to re-initialize(login right after logging out)
    initialized.current = null;
  };


  return (
    <UserProfileContext.Provider value={{
      logout,
      profile,
      initProfile,
      profileInitialized,
    }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
