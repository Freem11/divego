import React, { useContext, useEffect, useState } from 'react';
import { Form } from './form';
import { toast } from 'react-toastify';
import PasswordUpdateView from './view';
import { performPasswordReset } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { ModalContext } from '../../reusables/modal/context';
import { useNavigate } from 'react-router-dom';
import { ModalHandleProps } from '../../reusables/modal/types';
import detectOS from './platformDetect';
import { useTranslation } from 'react-i18next';


export default function PasswordUpdate(props: ModalHandleProps) {
  const [runningOn, setRunningOn] = useState<string | null>(null);
  const [revealRoutes, setRevealRoutes] = useState<boolean>(false);
  const { modalCancel } = useContext(ModalContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  props.registerModalCancelCallback(() => {
    navigate('/');
  });

  useEffect(() => {
    const platform = detectOS();
    setRunningOn(platform);
  }, []);

  const onSubmit = async (data: Form) => {
    const response = await performPasswordReset(data.password1);

    if (!response.error && response.data) {
      toast.success(t('PasswordUpdate.passwordUpdatedSuccessfully'));
      setRevealRoutes(true);
      return;
    }

    if (response.error?.message) {
      toast.error(response.error.message);
      return;
    }

    toast.error(t('PasswordUpdate.passwordUpdateError'));
  };

  return (
    <PasswordUpdateView
      onSubmit={onSubmit}
      onClose={modalCancel}
      revealRoutes={revealRoutes}
      runningOn={runningOn}
    />
  );
};
