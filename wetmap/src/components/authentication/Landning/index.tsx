import React, { useContext } from 'react';
import { SessionContext } from '../../contexts/sessionContext';
import { SliderContext } from '../../reusables/slider/context';
import { createProfile, grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import LandingPageView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ActiveSession } from '../../../entities/session';
import { socialSignIn } from '../../../supabaseCalls/authenticateSupabaseCalls';

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);

  async function getSocialSignIn(provider: any) {
    const signInData = await socialSignIn(provider);
    if (signInData) {
      await handleSupabaseSetup(signInData, setActiveSession);
    }
  }

  async function handleSupabaseSetup(sessionToken: any, setActiveSession: React.Dispatch<React.SetStateAction<ActiveSession | null>>) {
    console.log(sessionToken);
    // if (sessionToken.user) {
    //   await localStorage.setItem('token', JSON.stringify(sessionToken));
    //   if (sessionToken.session) {
    //     setActiveSession(sessionToken.session);
    //   } else {
    //     setActiveSession(sessionToken);
    //   }
    //   let sanitizeData;
    //   if (sessionToken.session) {
    //     sanitizeData = sessionToken.session;
    //   } else {
    //     sanitizeData = sessionToken;
    //   }

    //   const profileCheck = await grabProfileById(sanitizeData.user.id);
    //   console.log({ profileCheck });

    //   if (profileCheck) {
    //     await createProfile({
    //       id:    sanitizeData.user.id,
    //       email: sanitizeData.user.email,
    //     });
    //   }
    // }
  }

  return (
    <LandingPageView
      goToSlide={goToSlide}
      socialSignIn={getSocialSignIn}
    />
  );
}
