import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import {
  sessionCheck,
  signInStandard,
} from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import SignInPageView from './view';
import { toast } from 'react-toastify';
import screenData from '../../newModals/screenData.json';

export default function SignInPage() {
  const { setActiveSession } = useContext(SessionContext);
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const accessToken = await signInStandard(data);
    if (accessToken && accessToken?.data?.session !== null) {
      localStorage.setItem(
        'token',
        JSON.stringify(accessToken?.data.session.refresh_token),
      );
      setActiveSession(accessToken.data.session);
    } else {
      toast.error(screenData.SignInPage.signInError);
      return;
    }
    await sessionCheck();
  };

  return (
    <SignInPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
};
