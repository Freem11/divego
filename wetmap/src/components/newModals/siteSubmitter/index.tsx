import React from 'react';
import SiteSubmitterView from './view';
import { useState, useContext, useRef } from 'react';
import { useSpring } from 'react-spring';
import '../../modals/confirmationModal.css';
import '../../modals/siteSubmitter.css';
import exifr from 'exifr';
import { exifGPSHelper } from '../../../helpers/exifGPSHelpers';
import { insertDiveSiteWaits } from '../../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { DiveSpotContext } from '../../contexts/diveSpotContext';
import { MasterContext } from '../../contexts/masterContext';
import { ModalSelectContext } from '../../contexts/modalSelectContext';
import { ModalContext } from '../../contexts/modalContext';
import { MapConfigContext } from '../../contexts/mapConfigContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { Form } from './form';


const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

const noGPSZone = (
  <div
    style={{
      marginLeft:      '2%',
      backgroundColor: 'pink',
      height:          '40px',
      width:           '95%',
      color:           'red',
      borderRadius:    '15px',
    }}
  >
    <h4 style={{ marginLeft: '35px', paddingTop: '10px' }}>
      No GPS Coordinates Found!
    </h4>
  </div>
);

export default function SiteSubmitter(props) {
  const { animateSiteModal, setSiteModalYCoord } = props;
  const [showNoGPS, setShowNoGPS] = useState(false);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { setMasterSwitch } = useContext(MasterContext);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
  const { profile } = useContext(UserProfileContext);

  const { setMapConfig } = useContext(MapConfigContext);

  const [uploadedFile, setUploadedFile] = useState({
    selectedFile: null,
  });

  const successModalRef = useRef(null);
  const cautionModalRef = useRef(null);
  const [successModalYCoord, setSuccessModalYCoord] = useState(0);
  const [cautionModalYCoord, setCautionModalYCoord] = useState(0);
  const { modalPause } = useContext(ModalContext);

  const sucessModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${successModalYCoord}px,0)` },
  });

  const cautionModalSlide = useSpring({
    from: { transform: `translate3d(0,0,0)` },
    to:   { transform: `translate3d(0,${cautionModalYCoord}px,0)` },
  });

  const animateSuccessModal = () => {
    if (successModalYCoord === 0) {
      setSuccessModalYCoord(-windowHeight);
    } else {
      setSuccessModalYCoord(0);
    }
  };

  const animateCautionModal = () => {
    if (cautionModalYCoord === 0) {
      setCautionModalYCoord(-windowHeight);
    } else {
      setCautionModalYCoord(0);
    }
  };

  window.addEventListener('resize', trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const handleChange = (e) => {
    setAddSiteVals({ ...addSiteVals, [e.target.name]: e.target.value });

    if (e.target.name === 'PicFile') {
      setUploadedFile({ ...uploadedFile, selectedFile: e.target.files[0] });

      exifr.parse(e.target.files[0]).then((output) => {
        const EXIFData = exifGPSHelper(
          output.GPSLatitude,
          output.GPSLongitude,
          output.GPSLatitudeRef,
          output.GPSLongitudeRef,
        );

        if (EXIFData) {
          setAddSiteVals({
            ...addSiteVals,
            Latitude:  EXIFData[0],
            Longitude: EXIFData[1],
          });
        } else {
          setAddSiteVals({ ...addSiteVals });
          setShowNoGPS(true);
        }
      });
    }
  };

  const getDeviceLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setAddSiteVals({
            ...addSiteVals,
            Latitude:  position.coords.latitude,
            Longitude: position.coords.longitude,
          });
        },
        function (error) {
          console.log('location permissions denied', error.message);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 0 },
      );
    } else {
      console.log('unsupported');
    }
  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const onNavigate = () => {
    setChosenModal('DiveSite');
    setMapConfig(1);
    setShowNoGPS(false);
    setMasterSwitch(false);
    modalPause();
  };

  const onSubmit = (data: Form) => {
    insertDiveSiteWaits({
      Site:      data.Site,
      Latitude:  data.Latitude,
      Longitude: data.Longitude,
      UserID:    profile[0].UserID,
    });
    onClose();
  };

  const onClose = () => {
    setAddSiteVals({ ...addSiteVals, Site: '', Latitude: '', Longitude: '' });
    props?.onModalCancel?.();
  };


  return (
    <SiteSubmitterView
      handleChange={handleChange}
      getDeviceLocation={getDeviceLocation}
      onNavigate={onNavigate}
      onClose={onClose}
      onSubmit={onSubmit}
      values={{
        Latitude:  addSiteVals.Latitude,
        Longitude: addSiteVals.Longitude,
      }}
    />
  );
}
