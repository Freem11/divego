
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import SettingsView from './view';
import React from 'react';
import { useContext } from 'react';


export default function Settings(props) {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const { profile, setProfile } = useContext(UserProfileContext);

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

  return (
    <SettingsView
      onClose={onClose}
      handleLogout={handleLogout}
      profileType={profileType}
    />
  );
}
