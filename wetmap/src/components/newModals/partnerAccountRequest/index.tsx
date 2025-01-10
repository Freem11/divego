import React from 'react';
import PartnerAccountRequestView from './view';
import { useContext } from 'react';
import { Form } from './form';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import { createPartnerAccountRequest } from '../../../supabaseCalls/partnerSupabaseCalls';
import { toast } from 'react-toastify';
import screenData from '../screenData.json';

type PartnerAccountRequestpProps = Partial<ModalHandleProps>;

export default function PartnerAccountRequest(props: PartnerAccountRequestpProps) {
  const { profile } = useContext(UserProfileContext);

  const onSubmit = async (data: Form) => {
    const { error } = await createPartnerAccountRequest({
      ...data,
      UserId: profile?.UserID || null,
    });

    if (error) {
      toast.error(screenData.PartnerRequestPage.createError);
    } else {
      toast.success(screenData.PartnerRequestPage.createSuccess);
      onClose();
    }
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <PartnerAccountRequestView
      onClose={onClose}
      onSubmit={onSubmit}
      values={{
        BusinessName: '',
        WebsiteLink:  '',
        Latitude:     undefined,
        Longitude:    undefined,
      }}
    />
  );
}
