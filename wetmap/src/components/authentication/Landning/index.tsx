import React, { useContext } from 'react';
import { SessionContext } from '../../contexts/sessionContext';
import { SliderContext } from '../../reusables/slider/context';
import {
  register,
  signInStandard,
} from '../../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile } from '../../../supabaseCalls/accountSupabaseCalls';
import './index.css';
import LandingPageView from './view';
import { UserProfileContext } from '../../contexts/userProfileContext';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID;
const appleAppId = import.meta.env.VITE_APPLE_APP_ID;
const REDIRECT_URI = window.location.href;

console.log('appleAppId', appleAppId);
type formProps = {
  password:  string
  email:     string
  firstName: string
  lastName:  string
};

type AppleData = {
  authorization:  {
    id_token: string
  }
  user?:    {
    email: string
    name: {
      lastName:  string
      firstName: string
    }
  }
};

export default function LandingPage() {
  const { goToSlide } = useContext(SliderContext);
  const { setActiveSession } = useContext(SessionContext);
  const { setProfile } = useContext(UserProfileContext);

  function parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }

  const handleAppleUserData = async (userData: AppleData) => {
    const decoded = parseJwt(userData.authorization.id_token);

    if (userData.user) {
      const appleObject = {
        name:  `${userData.user.name.firstName} ${userData.user.name.lastName}`,
        email: userData.user.email,
        id:    decoded.sub,
      };
      handleOAuthSubmit(appleObject);
    } else {
      const reUsedApple = {
        email: decoded.email,
        id:    decoded.sub,
      };
      handleOAuthSubmit(reUsedApple);
    }
  };

  async function getGoogleUserData(GoogleToken: string) {
    if (!GoogleToken) return;

    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me/`, {
        headers: { Authorization: `Bearer ${GoogleToken}` },
      });
      const user = await res.json();
      handleOAuthSubmit(user);
    } catch (err) {
      console.log('error', err);
    }
  }

  async function getFacebookUserData(FacebookToken: string) {
    if (!FacebookToken) return;

    try {
      const res2 = await fetch(
        `https://graph.facebook.com/me?access_token=${FacebookToken}&fields=id,name,email`,
      );
      const user2 = await res2.json();
      handleOAuthSubmit(user2);
    } catch (err) {
      console.log('error', err);
    }
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
