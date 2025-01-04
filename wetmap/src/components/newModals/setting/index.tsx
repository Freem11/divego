
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ModalHandleProps } from '../../reusables/modal/types';
import SettingsView from './view';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import PartnerAccountRequestModal from '../../modals/partnerAccountRequestModal';
import { ModalContext } from '../../reusables/modal/context';


type SettingsProps = Partial<ModalHandleProps>;

export default function Settings(props: SettingsProps) {
  const { setActiveSession } = useContext(SessionContext);
  const { profile } = useContext(UserProfileContext);
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
    await localStorage.removeItem('token');
    await signOut();
    props?.onModalCancel?.();
    setActiveSession(null);
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  const handlePartnerButton = () => {
    modalShow(PartnerAccountRequestModal, { keepPreviousModal: true });
  };

  return (
    <SettingsView

      onClose={onClose}
      handleLogout={handleLogout}
      profileType={profileType}
      handlePartnerButton={handlePartnerButton}
    />
  );
}
