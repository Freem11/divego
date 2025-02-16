import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register, sessionCheck } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { toast } from 'react-toastify';
import screenData from '../../newModals/screenData.json';
import { UserProfileContext } from '../../contexts/userProfileContext';

export default function SignUpPage() {
  const { initProfile } = useContext(UserProfileContext);
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await register(data);
    const session = response.data.session;

    if (response.error?.message) {
      toast.error(response.error.message);
      return;
    }

    if (session !== null) {
      initProfile(true);
    } else {
      toast.error(screenData.SignUpPage.signUpError);
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
