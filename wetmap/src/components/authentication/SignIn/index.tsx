import React, { useContext } from 'react';
import { SliderContext } from '../../reusables/slider/context';
import { Form } from './form';
import { signInStandard } from '../../../supabaseCalls/authenticateSupabaseCalls';
import SignInPageView from './view';
import { toast } from 'react-toastify';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { initProfile } = useContext(UserProfileContext);
  const { goToSlide } = useContext(SliderContext);
  const { t } = useTranslation();

  const onSubmit = async (data: Form) => {
    const accessToken = await signInStandard(data);
    if (accessToken && accessToken?.data?.session !== null) {
      initProfile(true);
    } else {
      toast.error(t('SignInPage.signInError'));
      return;
    }
  };

  return (
    <SignInPageView
      onSubmit={onSubmit}
      goToSlide={goToSlide}
    />
  );
};
