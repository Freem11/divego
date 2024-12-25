import React, { useContext } from 'react';
import { SessionContext } from '../../contexts/sessionContext';
import { SliderContext } from '../../reusables/slider/context';
import { createProfile, grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import './index.css';
import LandingPageView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { supabase } from '../../../supabase';
import { ActiveSession } from '../../../entities/session';

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);

  async function socialSignIn(provider: any) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: provider,
    });

    if (error) console.log(error);
    if (data) handleSupabaseSetup(data, setActiveSession);
  }

  async function handleSupabaseSetup(sessionToken: any, setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>) {
    if (sessionToken) {
      await localStorage.setItem('token', JSON.stringify(sessionToken));
      if (sessionToken.session) {
        setActiveSession(sessionToken.session);
      } else {
        setActiveSession(sessionToken);
      }
      let sanitizeData;
      if (sessionToken.session) {
        sanitizeData = sessionToken.session;
      } else {
        sanitizeData = sessionToken;
      }

      const profileCheck = await grabProfileById(sanitizeData.user.id);

      if (profileCheck && profileCheck.length === 0) {
        await createProfile({
          id:    sanitizeData.user.id,
          email: sanitizeData.user.email,
        });
        console.log('profile created!');
      }
    }
  }

  return (
    <LandingPageView
      goToSlide={goToSlide}
      setProfile={setProfile}
      socialSignIn={socialSignIn}
    />
  );
}
