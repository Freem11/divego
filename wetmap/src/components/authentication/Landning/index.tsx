import React, { useContext } from 'react';
import { SessionContext } from '../../contexts/sessionContext';
import { SliderContext } from '../../reusables/slider/context';
import {
  register,
  signInStandard,
} from '../../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile, grabProfileById } from '../../../supabaseCalls/accountSupabaseCalls';
import './index.css';
import LandingPageView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { supabase } from '../../../supabase';
import { ActiveSession } from '../../../entities/session';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
const appleAppId = import.meta.env.VITE_APPLE_APP_ID;
const REDIRECT_URI = window.location.href;

type formProps = {
  password:  string
  email:     string
  firstName: string
  lastName:  string
};

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);

  const handleAppleUserData = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
    });

    if (error) console.log(error);
    if (data) handleSupabaseSetup(data, setActiveSession);
  };

  async function getGoogleUserData() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.log(error);
    if (data) handleSupabaseSetup(data, setActiveSession);
  }

  async function getFacebookUserData() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
    });

    if (error) console.log(error);
    if (data) handleSupabaseSetup(data, setActiveSession);
  }

  const handleOAuthSubmit = async (user: any) => {
    let Fname;
    let LName;
    const Pword = user.id;
    const MailE = user.email;

    if (user.given_name) {
      if (user.family_name) {
        Fname = user.given_name;
        LName = user.family_name;
      } else {
        Fname = user.given_name.split(' ').slice(0, -1).join(' ');
        LName = user.given_name.split(' ').slice(-1)[0];
      }
    } else if (user.name) {
      Fname = user.name.split(' ').slice(0, 1);
      LName = user.name.split(' ').slice(-1);
    }

    await OAuthSignIn({
      password:  Pword,
      email:     MailE,
      firstName: Fname,
      lastName:  LName,
    });
  };


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
  async function OAuthSignIn(formVals: formProps) {
    const accessToken = await signInStandard(formVals);
    if (accessToken?.data.session !== null) {
      await localStorage.setItem(
        'token',
        JSON.stringify(accessToken?.data.session.refresh_token),
      );
      if (accessToken) {
        setActiveSession(accessToken?.data.session);
      }

      return;
    } else {
      const registrationToken = await register(formVals);
      if (registrationToken) {
        await createProfile({
          id:    registrationToken?.data?.session?.user.id,
          email: registrationToken?.data?.user?.email,
        });
      }

      if (registrationToken?.data.session !== null) {
        await localStorage.setItem(
          'token',
          JSON.stringify(registrationToken?.data.session.refresh_token),
        );
        if (registrationToken) {
          setActiveSession(registrationToken?.data.session);
        }
      } else {
        alert('You already have an account with this email');
      }
    }
  }

  return (
    <LandingPageView
      goToSlide={goToSlide}
      setProfile={setProfile}
      REDIRECT_URI={REDIRECT_URI}
      googleClientId={googleClientId}
      getGoogleUserData={getGoogleUserData}
      facebookAppId={facebookAppId}
      getFacebookUserData={getFacebookUserData}
      appleAppId={appleAppId}
      handleAppleUserData={handleAppleUserData}
    />
  );
}
