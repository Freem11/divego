import React, { useContext } from 'react';
import { Form } from './form';
import PasswordRecoveryView from './view';
import { sendPasswordResetEmail } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SliderContext } from '../../reusables/slider/context';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

export default function PasswordRecoveryPage() {
  const { t } = useTranslation();
  const { goToSlide } = useContext(SliderContext);

  const onSubmit = async (data: Form) => {
    const response = await sendPasswordResetEmail(data.email, window.location.origin + '/account/password/');

    if (!response.error && response.data) {
      toast.success(t('PasswordRecoveryPage.passwordResetEmailSent'));
      return;
    }

    if (response.error && response.error.message) {
      toast.error(response.error.message);
      return;
    }

    toast.error(t('PasswordRecoveryPage.passwordResetError'));
  };

  return (
    <PasswordRecoveryView
      goToSlide={goToSlide}
      onSubmit={onSubmit}
    />
  );
};
