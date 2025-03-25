import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import SettingsView from './view';
import PartnerAccountRequest from '../partnerAccountRequest';
import React, { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../../reusables/modal/context';
import ConfirmDeleteAccount from '../confirmDeleteAccount';

type SettingsProps = Partial<ModalHandleProps>;


export default function Settings(props: SettingsProps) {
  const { profile, logout, metrics, switchToMetrics } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);
  const [profileType, setProfileType] = useState<string | null>(null);

  useEffect(() => {
    if (profile?.partnerAccount) {
      setProfileType('Partner Account');
    } else {
      setProfileType('Diver Account');
    }
  }, [profile?.partnerAccount]);


  const handleLogout = async () => {
    props?.onModalCancel?.();
    logout();
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  const handlePartnerButton = () => {
    modalShow(PartnerAccountRequest, { keepPreviousModal: true });
  };

  const handleDanger = () => {
    modalShow(ConfirmDeleteAccount, { keepPreviousModal: true });
  };


  return (
    <SettingsView
      onClose={onClose}
      handleLogout={handleLogout}
      profileType={profileType}
      handlePartnerButton={handlePartnerButton}
      handleDanger={handleDanger}
      metrics={metrics}
      switchToMetrics={switchToMetrics}
    />
  );
}
