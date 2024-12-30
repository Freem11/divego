import React, { useContext, useState } from 'react';
import { Form } from './form';
import LogInPageView from './view';
import { sendPasswordResetEmail } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SliderContext } from '../../reusables/slider/context';

export default function PasswordRecoveryPage() {
  const { goToSlide } = useContext(SliderContext);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [submitFail, setSubmitFail] = useState<string | null>(null);

  const onSubmit = async (data: Form) => {
    if (data.email === '') {
      setSubmitFail('Please supply the email that you use to login');

      return;
    } else {
      sendPasswordResetEmail(data.email, window.location.origin);
      // sendPasswordResetEmail(data.email, `${window.location.origin}/passwordReset`);
      setSubmitFail('Email Sent! Check Your Email For A Link To Reset Your Password');
    }
  };

  return (
    <LogInPageView
      goToSlide={goToSlide}
      onSubmit={onSubmit}
      secureTextEntry={secureTextEntry}
      setSecureTextEntry={setSecureTextEntry}
      submitFail={submitFail}
      setSubmitFail={setSubmitFail}
    />
  );
};
