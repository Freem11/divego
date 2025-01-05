import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register, sessionCheck } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { createProfile } from '../../../supabaseCalls/accountSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { toast } from 'react-toastify';

export default function SignUpPage() {
  const { setActiveSession } = useContext(SessionContext);
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await register(data);
    const session = response.data.session;

    if (response.error?.message) {
      toast.error(response.error.message);
      return;
    }

    if (session !== null) {
      await createProfile({ id: session.user.id, email: data.email });
      await localStorage.setItem(
        'token',
        JSON.stringify(session.refresh_token),
      );
      setActiveSession(session);
    } else {
      toast.error(`You have already registered this account, please sign in`);
    }
    await sessionCheck();
  };

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
}
