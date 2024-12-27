
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import SettingsView from './view';
import React from 'react';
import { useContext } from 'react';
import PartnerAccountRequestModal from '../../modals/partnerAccountRequestModal';
import { ModalContext } from '../../reusables/modal/context';


export default function Settings(props) {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);
  const { modalShow } = useContext(ModalContext);

  const handleLogout = async () => {
    await localStorage.removeItem('token');
    await signOut();
    props?.onModalCancel?.();
    setActiveSession(null);
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  let profileType;
  if (profile.partnerAccount) {
    profileType = 'Partner Account';
  } else {
    profileType = 'Diver Account';
  }

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
