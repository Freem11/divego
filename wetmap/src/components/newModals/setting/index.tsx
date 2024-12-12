
{ /*
import './settings.css';
import { Label } from 'reactstrap';
import Collapse from '@mui/material/Collapse';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ActDelDialog from './dialog';
import { grabRequestById } from '../../supabaseCalls/partnerSupabaseCalls';
import ModalHeader from '../reusables/modalHeader';
import LargeButton from '../reusables/button/largeButton';
import PartnerAccountRequestModal from './partnerAccountRequestModal';
import { ModalContext } from '../reusables/modal/context';
*/ }
import SettingsView from './view';
import { signOut } from '../../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../../contexts/sessionContext';
import { useContext, useState, useEffect } from 'react';
import React from 'react';


export default function Settings(props) {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  { /*
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [requestCheck, setRequestCheck] = useState([]);
  const { modalShow } = useContext(ModalContext);


  const checkForRequest = async (id) => {
    const returnedCheck = await grabRequestById(id);
    setRequestCheck(returnedCheck);
  };

  const handlePartnerButton = () => {
    modalShow(PartnerAccountRequestModal, { keepPreviousModal: true });
  };
  useEffect(() => {
    checkForRequest(activeSession.user.id);
  }, []);

  const dangerZone = (
    <div
      style={{
        height:       '50px',
        width:        '90%',
        color:        'pink',
        borderRadius: '15px',
        position:     'absolute',
        bottom:       '5%',
        left:         '30%',
        textAlign:    'center',
      }}
    >
      <div
        onClick={() => {
          setOpenDialog(true);
          setShowDangerZone(false);
        }}
        className="AccountDeleteButton"
      >
        <Label
          style={{
            fontFamily: 'Itim',
            color:      'maroon',
            cursor:     'pointer',
            fontSize:   '1vw',
          }}
        >
          Delete Account
        </Label>
      </div>
    </div>
  );

  const handleLogout = async () => {
    await localStorage.removeItem('token');
    await signOut();
    setActiveSession(null);
  };  */ }

  const onClose = () => {
    props?.onModalCancel?.();
  };

  return (
    <SettingsView
      onClose={onClose}
    />
  );
}
