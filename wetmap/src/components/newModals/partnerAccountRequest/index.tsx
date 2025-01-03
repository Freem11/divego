import React from 'react';
import PartnerAccountRequestView from './view';
import { useContext } from 'react';
import { Form } from './form';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import { createPartnerAccountRequest } from '../../../supabaseCalls/partnerSupabaseCalls';
import { safeCall } from '../../../supabaseCalls/_safeCall';

type PartnerAccountRequestpProps = Partial<ModalHandleProps>;

export default function PartnerAccountRequest(props: PartnerAccountRequestpProps) {
  const { profile } = useContext(UserProfileContext);

  const onSubmit = async (data: Form) => {

    await safeCall(
      () =>
        createPartnerAccountRequest({
          WebsiteLink: data.WebsiteLink || '',
          BusinessName: data.BusinessName || '',
          Latitude: data.Latitude || 0,
          Longitude: data.Longitude || 0,
          UserId: profile?.UserID || '',
        }),
    );

    props?.onModalSuccess?.();
    onClose();
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
        WebsiteLink: '',
        Latitude: undefined,
        Longitude: undefined,
      }}
    />
  );
}
