import React, { useRef, useState } from 'react';
import { ActiveProfile } from '../../entities/profile';
import { sessionCheck, signOut } from '../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile, grabProfileById } from '../../supabaseCalls/accountSupabaseCalls';
import { UserProfileContext } from './userProfileContext';
import { Session } from '@supabase/supabase-js';

export type UserProfileContextType = {
  logout:             () => Promise<void>
  profile:            ActiveProfile | null
  session:            Session | null
  initProfile:        (force?: boolean) => Promise<void>
  profileInitialized: boolean | null
  metrics:            boolean
  switchToMetrics:    (metrics: boolean) => void
};


export const UserProfileContextProvider = ({ children }: any) => {
  // Used to expose this flag outside and let other component react on it
  // null - profile is not initialized
  // true - profile is initialized successfully
  // false - that initialization failed
  const [profileInitialized, setProfileInitialized] = useState<boolean | null>(null);

  const [metrics, setMetrics] = useState<boolean>(false);
  // Used to prevent double initialization during re-renders, avoid createProfile call
  const initialized = useRef<boolean | null>(null);

  // Just to store the profile
  const [profile, setProfile] = useState<ActiveProfile | null>(null);

  // Supabase session
  const [session, setSession] = useState<Session | null>(null);

  const getSession = async () => {
    const session = await sessionCheck();

    if (session.error) {
      console.log('Unable to initialize session', session.error);
      return null;
    }

    if (!session.data.session?.user.id) {
      return null;
    }

    return session.data.session as Session;
  };

  const initProfile = async (force = false) => {
    if (force) {
      // sometimes we need to profile reinitialization: after logging in or out, after changing profile data...
      initialized.current = null;
      setMetrics(true);
    }

    if (initialized.current === null) {
      initialized.current = false;
      const session = await getSession();

      setSession(session);

      if (!session?.user.id) {
        // User is not signed in - profile will be empty
        initialized.current = true;
        setProfileInitialized(true);
        setMetrics(true);
        return;
      }

      const profile = await grabProfileById(session.user.id);
      if (profile) {
        setProfile(profile);
        setMetrics(true);
      } else {
        const created = await createProfile({
          id:    session.user.id,
          email: session.user.email,
        });

        if (created.error) {
          setProfileInitialized(false);
          console.log('Unable to create new profile for user ', session.user.id);
          return;
        }

        const profile = await grabProfileById(session.user.id);
        if (!profile) {
          setProfileInitialized(false);
          setMetrics(true);
          console.log('Unable to fetch new profile');
          return;
        }
        setProfile(profile);
        setMetrics(true);
      }
      initialized.current = true;
      setProfileInitialized(true);
    }
  };

  const logout = async () => {
    await signOut();
    setProfile(null);

    // allow initProfile to be called again to re-initialize(login right after logging out)
    initialized.current = null;
  };

  const switchToMetrics = (metrics: boolean) => {
    setMetrics(metrics);
  };


  return (
    <UserProfileContext.Provider value={{
      logout,
      switchToMetrics,
      profile,
      session,
      initProfile,
      profileInitialized,
      metrics,
    }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
