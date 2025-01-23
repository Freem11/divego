
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import SettingsView from './view';
import PartnerAccountRequest from '../partnerAccountRequest';
import React, { useEffect, useState, useContext } from 'react';
import { ModalContext } from '../../reusables/modal/context';
import ConfirmDeleteAccount from '../confirmDeleteAccount';

type SettingsProps = Partial<ModalHandleProps>;


export default function Settings(props: SettingsProps) {
  const { setActiveSession } = useContext(SessionContext);
  const { profile } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);
  const [profileType, setProfileType] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (profile?.partnerAccount) {
      setProfileType('Partner Account');
    } else {
      setProfileType('Diver Account');
    }
  }, [profile?.partnerAccount]);


  const handleLogout = async () => {
    await localStorage.removeItem('token');
    await signOut();
    props?.onModalCancel?.();
    setActiveSession(null);
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  const handlePartnerButton = () => {
    modalShow(PartnerAccountRequest, { keepPreviousModal: true });
  };

  const handleDanger = () => {
    // setOpenDialog(true);

    modalShow(ConfirmDeleteAccount, { keepPreviousModal: true });
  };


  return (
    <SettingsView

      onClose={onClose}
      handleLogout={handleLogout}
      profileType={profileType}
      handlePartnerButton={handlePartnerButton}
      handleDanger={handleDanger}
      setOpenDialog={setOpenDialog}
      openDialog={openDialog}
    />
  );
}
