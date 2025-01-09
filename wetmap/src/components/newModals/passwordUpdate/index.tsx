import React, { useContext } from 'react';
import { Form } from './form';
import { toast } from 'react-toastify';
import PasswordUpdateView from './view';
import { performPasswordReset } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { ModalContext } from '../../reusables/modal/context';
import { useNavigate } from 'react-router-dom';
import { ModalHandleProps } from '../../reusables/modal/types';
import screenData from '../screenData.json';


export default function PasswordUpdate(props: ModalHandleProps) {
  const { modalCancel } = useContext(ModalContext);
  const navigate = useNavigate();

  props.registerModalCancelCallback(() => {
    navigate('/');
  });

  const onSubmit = async (data: Form) => {
    const response = await performPasswordReset(data.password1);

    if (!response.error && response.data) {
      toast.success(screenData.PasswordUpdate.passwordUpdatedSuccessfully);
      modalCancel();
      return;
    }

    if (response.error?.message) {
      toast.error(response.error.message);
      return;
    }

    toast.error(screenData.PasswordUpdate.passwordUpdateError);
  };

  return (
    <PasswordUpdateView
      onSubmit={onSubmit}
      onClose={modalCancel}
    />
  );
};
