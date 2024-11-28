import { Label } from 'reactstrap';
import { useContext, useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { signOut } from '../../supabaseCalls/authenticateSupabaseCalls';
import { SessionContext } from '../contexts/sessionContext';
import './settings.css';
import ActDelDialog from './dialog';
import { grabRequestById } from '../../supabaseCalls/partnerSupabaseCalls';
import ModalHeader from '../reusables/modalHeader';
import LargeButton from '../reusables/button/largeButton';
import PartnerAccountRequestModal from './partnerAccountRequestModal';
import { ModalContext } from '../contexts/modalContext';

const Settings = (props) => {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [requestCheck, setRequestCheck] = useState([]);
  const { modalShow } = useContext(ModalContext);


  const checkForRequest = async (id) => {
    let returnedCheck = await grabRequestById(id);
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
  };

  return (
    <>
      <ModalHeader title="Settings" onClose={props.onModalCancel} />
      <div className="hero hero-sm mx-4">
        <div className="hero-body flex-center-column">
          <LargeButton onClick={handleLogout} btnText="Sign Out" />
          <LargeButton
            onClick={requestCheck.length > 0 ? null : handlePartnerButton}
            btnText={
              requestCheck.length > 0
                ? 'Request In Progress'
                : 'Request Partner Account'
            }
            requestCheck={requestCheck}
            customStyle={true}
          />

          <div
            className="dangerZonebar"
            onClick={() => setShowDangerZone(!showDangerZone)}
          >
            <ErrorOutlineIcon
              sx={{
                color:       'maroon',
                height:      '2vw',
                marginRight: '10%',
              }}
            >
            </ErrorOutlineIcon>
            <strong className="dangerText">Danger Zone</strong>
            <ErrorOutlineIcon
              sx={{
                color:      'maroon',
                height:     '2vw',
                marginLeft: '10%',
              }}
            >
            </ErrorOutlineIcon>
          </div>

          <Collapse
            in={showDangerZone}
            orientation="vertical"
            collapsedSize="0px"
            className="dngZn"
          >
            {dangerZone}
          </Collapse>
        </div>
      </div>

      <ActDelDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  );
};

export default Settings;
