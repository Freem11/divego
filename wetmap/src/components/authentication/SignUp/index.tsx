import React, { useContext, useState } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register, sessionCheck } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile } from '../../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';

export default function SignUpPage() {
  const { setActiveSession } = useContext(SessionContext);
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [regFail, setRegFail] = useState<string | null>(null);


  const onSubmit = async (data: Form) => {
    if (data.fullname === '' || data.email === '' || data.password === '') {
      setRegFail('Please supply your name, email and password');
      return;
    } else {
      const registrationToken = await register(data);
      if (registrationToken && registrationToken.data.session !== null) {
        await createProfile({ id: registrationToken.data.session.user.id, email: data.email });
        await localStorage.setItem(
          'token',
          JSON.stringify(registrationToken.data.session.refresh_token),
        );
        setActiveSession(registrationToken.data.session);
      } else {
        setRegFail(`You have already registered this account, please sign in`);
      }
      await sessionCheck();
    }
  };

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
      secureTextEntry={secureTextEntry}
      setSecureTextEntry={setSecureTextEntry}
      regFail={regFail}
      setRegFail={setRegFail}
    />
  );
}
