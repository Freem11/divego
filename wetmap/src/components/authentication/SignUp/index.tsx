import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import SignUpPageView from './view';
import { register } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { useTranslation } from 'react-i18next';

export default function SignUpPage() {
  const { initProfile } = useContext(UserProfileContext);
  const { goToSlide } = useContext(SliderContext);
  const { t } = useTranslation();

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
      toast.error(t('SignUpPage.signUpError'));
    }
  };

  return (
    <SignUpPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
}
