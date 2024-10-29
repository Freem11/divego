import { useState, useEffect, useContext, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import ConfirmationModal from './confirmationModal';
import './confirmationModal.css';
import './siteSubmitter.css';
import exifr from 'exifr';
import { exifGPSHelper } from '../../helpers/exifGPSHelpers';
import { insertDiveSiteWaits } from '../../supabaseCalls/diveSiteWaitSupabaseCalls';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { MasterContext } from '../contexts/masterContext';
import { ModalSelectContext } from '../contexts/modalSelectContext';
import { ModalContext } from '../contexts/modalContext';
import Icon  from '../../icons/Icon';
import WavyHeader from '../newModals/wavyHeader';
import style from '../newModals/modalContent.module.scss';
import screenData from '../newModals/screenData.json';
import TextInputField from '../newModals/textInput';
import Button from '../newModals/button';

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

const SiteSubmitter = (props) => {
  const { animateSiteModal, setSiteModalYCoord } = props;
  const [showNoGPS, setShowNoGPS] = useState(false);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { setMasterSwitch } = useContext(MasterContext);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);

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
    }
    else {
      setSuccessModalYCoord(0);
    }
  };

  const animateCautionModal = () => {
    if (cautionModalYCoord === 0) {
      setCautionModalYCoord(-windowHeight);
    }
    else {
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
        let EXIFData = exifGPSHelper(
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
        }
        else {
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
    }
    else {
      console.log('unsupported');
    }
  };

  const handleNoGPSClose = () => {
    setShowNoGPS(false);
    return;
  };

  const onNavigate = () => {
    setChosenModal('DiveSite');
    setShowNoGPS(false);
    setMasterSwitch(false);
    modalPause();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let SiteV = addSiteVals.Site.toString();
    let LatV = parseFloat(addSiteVals.Latitude);
    let LngV = parseFloat(addSiteVals.Longitude);

    if (
      SiteV
      && typeof SiteV === 'string'
      && LatV
      && typeof LatV === 'number'
      && LngV
      && typeof LngV === 'number'
    ) {
      insertDiveSiteWaits(addSiteVals);
      setAddSiteVals({ ...addSiteVals, Site: '', Latitude: '', Longitude: '' });
      animateSuccessModal();
      return;
    }
    else {
      animateCautionModal();
    }
  };

  const onClose = () => {
    setAddSiteVals({ ...addSiteVals, Site: '', Latitude: '', Longitude: '' });
    props?.onModalCancel?.();
  };

  return (
    <>
      <div className={style.backButton} style={{ position: 'absolute' }}>
      <Icon
          name="chevron-left"
          fill="white"
          width="60px"
          onClick={() => onClose()}
        />
      </div>

      <div className={style.picZoneHalf2} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginLeft: "5%",
          marginRight: "5%",
          height: "50%",
        }}
      >
        <div style={{ width: '100%',  marginLeft: "5%", marginBottom: "5%", overflowY: 'auto' }}>
          <p className={style.headerText}>{screenData.DiveSiteAdd.header}</p>

          <div
            className={"hero"}
            style={{
              marginBottom: "20%",
              width: "75%",
              alignItems: "center",
              padding: 0
            }}
          >
            <div className={"hero-body"}>
              <TextInputField
                dataType="text"
                icon={"diving-scuba-flag"}
                inputValue={addSiteVals.Site}
                placeHolderText={screenData.DiveSiteAdd.siteNamePlaceholder}
                secure={false}
                onChangeText={handleChange}
              />
            </div>
            <div className={"hero-body"}>
              <TextInputField
                dataType="text"
                icon={"latitude"}
                inputValue={addSiteVals.Latitude}
                placeHolderText={screenData.DiveSiteAdd.latPlaceholder}
                secure={false}
                onChangeText={handleChange}
              />
            </div>
            <div className={"hero-body"}>
              <TextInputField
                dataType="text"
                icon={"longitude"}
                inputValue={addSiteVals.Longitude}
                placeHolderText={screenData.DiveSiteAdd.lngPlaceholder}
                secure={false}
                onChangeText={handleChange}
              />
            </div>
          </div>
        </div>

        <div className={style.horizontalButtonContainer}>
          {/* FIXME: button size is wrong with wide window size */}
          <Button
            onClick={getDeviceLocation}
            btnText={screenData.DiveSiteAdd.myLocationButton}
            helperText={screenData.DiveSiteAdd.myLocationExplainer}
            altStyle={true}
          />
          <Button
            onClick={onNavigate}
            btnText={screenData.DiveSiteAdd.pinButton}
            altStyle={true}
          />
        </div>

        <div className={style.submitZone}>
          <Button
            onClick={handleSubmit}
            btnText={screenData.DiveSiteAdd.submitButton}
            icon={true}
          />
        </div>
      </div>

      <WavyHeader
        customStyles="100%"
      >
      </WavyHeader>

      <animated.div
        className="successModal modalBase"
        style={sucessModalSlide}
        ref={successModalRef}
      >
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={animateSuccessModal}
          handleClose={onClose}
          isSuccess={true}
        />
      </animated.div>

      <animated.div
        className="cautionModal modalBase"
        style={cautionModalSlide}
        ref={cautionModalRef}
      >
        <ConfirmationModal
          submissionItem="dive site"
          animateModal={animateCautionModal}
          isSuccess={false}
        />
      </animated.div>
    </>
  );
};

export default SiteSubmitter;
