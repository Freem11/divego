import React from 'react';
import PartnerAccountRequestView from './view';
import { useContext } from 'react';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';
import { SessionContext } from '../../contexts/sessionContext';
import { createPartnerAccountRequest } from '../../../supabaseCalls/partnerSupabaseCalls';

type PartnerAccountRequestpProps = Partial<ModalHandleProps>;

export default function PartnerAccountRequest(props: PartnerAccountRequestpProps) {
  const { activeSession } = useContext(SessionContext);

  const onSubmit = (data: Form) => {
    createPartnerAccountRequest({
      ...data,
      UserId: activeSession?.user?.id || null,
    })
      .then(() => {
        props?.onModalSuccess?.();
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting partner account request in (createPartnerAccountRequest)', error);
      });
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
