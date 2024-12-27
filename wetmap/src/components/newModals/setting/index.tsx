
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import SettingsView from './view';
import React from 'react';
import { useContext } from 'react';


export default function Settings(props) {
  const { activeSession, setActiveSession } = useContext(SessionContext);

  const handleLogout = async () => {
    await localStorage.removeItem('token');
    await signOut();
    props?.onModalCancel?.();
    setActiveSession(null);
  };

  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <SettingsView
      onClose={onClose}
      handleLogout={handleLogout}
    />
  );
}
