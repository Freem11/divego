import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import {
  sessionCheck,
  signInStandard,
} from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import LogInPageView from './view';
import { toast } from 'react-toastify';

export default function LogInPage() {
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
      toast.error('The credentials you supplied are not valid');
      return;
    }
    await sessionCheck();
  };

  return (
    <LogInPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
};
