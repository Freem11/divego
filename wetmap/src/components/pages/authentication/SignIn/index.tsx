import React, { useState, useContext } from 'react';
import { SliderContext } from '../../../reusables/slider/context';
import { Form } from './form';
import {
  sessionCheck,
  signInStandard,
} from '../../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../../contexts/sessionContext';
import SignInPageView from './view';


export default function SignInPage() {
  const { setActiveSession } = useContext(SessionContext);
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginFail, setLoginFail] = useState<string | null>(null);

  const onSubmit = async (data: Form) => {
    if (data.email === '' || data.password === '') {
      setLoginFail('Please fill out both email and password');

      return;
    } else {
      const accessToken = await signInStandard(data);

      if (accessToken && accessToken?.data?.session !== null) {
        localStorage.setItem(
          'token',
          JSON.stringify(accessToken?.data.session.refresh_token),
        );
        setActiveSession(accessToken.data.session);
      } else {
        setLoginFail('The credentials you supplied are not valid');
        return;
      }
      await sessionCheck();
    }
  };

  return (
    <SignInPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
      secureTextEntry={secureTextEntry}
      setSecureTextEntry={setSecureTextEntry}
      loginFail={loginFail}
      setLoginFail={setLoginFail}
    />
  );
};
