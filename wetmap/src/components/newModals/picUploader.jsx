import React,  { useState, useContext, useEffect } from 'react';
import screenData from './screenData.json';
import Icon  from '../../icons/Icon';
import style from './modalContent.module.scss';
import LargeButton from './largeButton';
import Button from './button';
import { FormGroup, Input } from 'reactstrap';
import WavyHeader from './wavyHeader';
import TextInputField from '../newModals/textInput';
import AutoSuggest from '../autoSuggest/autoSuggest';
import { PinContext } from '../contexts/staticPinContext';
import { insertPhotoWaits } from '../../supabaseCalls/photoWaitSupabaseCalls';
import { handleImageUpload, clearPreviousImage } from './imageUploadHelpers';

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function PicUploader(props) {
  const { onModalCancel } = props;
  const { pin, setPin } = useContext(PinContext);
  const [picUrl, setPicUrl] = useState(null);

  const [successModalYCoord, setSuccessModalYCoord] = useState(0);
  const [cautionModalYCoord, setCautionModalYCoord] = useState(0);


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

  function handleClick() {
    document.getElementById('file').click();
  }

  const handleImageSelection = async (e) => {
    if (e.target && e.target.name === 'PicFile') {
      if (pin.PicFile !== null) {
        clearPreviousImage(pin.PicFile);
      }

      const createFileName = await handleImageUpload(e);
      setPin({
        ...pin,
        PicFile: `animalphotos/public/${createFileName}`,
      });
    }
  };

  useEffect(() => {
    if (pin.PicFile) {
      let photoName = pin.PicFile.split('/').pop();
      setPicUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`,
      );
    } else {
      setPicUrl(null);
    }
  }, [pin.PicFile]);

  const onSubmit = async () => {
    if (pin.PicFile && pin.PicDate.length > 0 && pin.Animal.length > 0) {
      insertPhotoWaits(pin);
      setPin({
        ...pin,
        PicFile: null,
        Animal:  '',
        PicDate: '',
      });
      setPicUrl(null);
      animateSuccessModal();
    } else {
      animateCautionModal();
    }
  };

  const onClose = async () => {
    if (pin.PicFile !== null || pin.PicFile === '') {
      await clearPreviousImage(pin.PicFile);
    }
    setPin({
      ...pin,
      PicFile:   null,
      Animal:    '',
      PicDate:   '',
      Latitude:  '',
      Longitude: '',
      siteName:  '',
    });
    onModalCancel();
  };

  window.addEventListener('resize', trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const backgroundStyle = {
    paddingTop:           '25%',
    backgroundImage:      `url(${picUrl})`,
    display:              'flex',
    aspectRatio:          1,
    width:                '100%',
    backgroundSize:       'cover',
    backgroundRepeat:     'no-repeat',
    backgroundPosition:   'center',
    borderTopLeftRadius:  '2vw',
    borderTopRightRadius: '2vw',
    borderWidth:          0,
    alignItems:           'center',
    justifyContent:       'center',
  };

  return (
    <div
      className="$themeWhite"
      style={{
        width:           '100%',
        height:          '100%',
        backgroundColor: '$themeWhite',
        marginBottom:    '100%',
      }}
    >
      <div className={style.backButton} style={{ position: 'absolute' }}>
        <Icon
          name="chevron-left"
          fill="white"
          width="60px"
          onClick={() => onClose()}
        />
      </div>

      <div className={style.picZone}>
        {picUrl
          ? (
              <div style={backgroundStyle} />
              // <img src={picUrl} width="100%" className={style.picStyles}></img>
            )
          : (
              <div style={{ paddingTop: '25%' }}>
                <LargeButton
                  altStyle={true}
                  btnText={screenData.PicUploader.uploadButton}
                  onClick={() => handleClick()}
                />
              </div>
            )}

        <FormGroup>
          <Input
            placeholder="Upload"
            className="modalInputs2"
            style={{
              textAlign: 'center',
              display:   'none',
            }}
            id="file"
            type="file"
            name="PicFile"
            bsSize="lg"
            onChange={handleImageSelection}
          >
          </Input>
        </FormGroup>

        {picUrl
          ? (
              <div style={{ position: 'absolute', right: '5%', marginTop: '30vh' }}>
                <Icon
                  name="camera-plus"
                  fill="white"
                  width="40px"
                  onClick={() => handleClick()}
                />
              </div>
            )
          : null}
      </div>
      <div
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          flexDirection:  'column',
          marginLeft:     '5%',
          marginRight:    '5%',
          height:         '50%',
        }}
      >
        <div style={{ height: 400, width: '100%',  marginLeft: '5%', marginBottom: '5%', overflowY: 'auto' }}>
          <p className={style.headerText}>{screenData.PicUploader.header}</p>

          <div
            style={{
              marginBottom: '20%',
              width:        '75%',
              alignItems:   'center',
            }}
          >
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whatLabel}
              </p>
              <AutoSuggest
                pin={pin}
                setPin={setPin}
                inputValue={pin.Animal}
                icon="shark"
                placeHolderText={screenData.PicUploader.whatPlaceholder}
                vectorIcon="MaterialCommunityIcons"
              />
            </div>
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whenLabel}
              </p>
              <div pointerEvents="none">
                <TextInputField
                  dataType="date"
                  icon="calendar-month"
                  inputValue={pin.PicDate}
                  placeHolderText={screenData.PicUploader.whenPlaceholder}
                  onChangeText={dateText => setPin({ ...pin, PicDate: dateText.target.value })}
                  secure={false}
                  vectorIcon="MaterialCommunityIcons"
                />
              </div>
            </div>
            <div style={null}>
              <p className={style.inputLabels}>
                {screenData.PicUploader.whereLabel}
              </p>
              <TextInputField
                dataType="text"
                icon="anchor"
                inputValue={pin.siteName}
                placeHolderText={screenData.PicUploader.wherePlaceholder}
                secure={false}
              />
            </div>
          </div>
        </div>

        <div className={style.submitZone}>
          <Button
            onClick={() => onSubmit()}
            btnText={screenData.PicUploader.submitButton}
            icon={true}
          />
        </div>
      </div>

      <WavyHeader
        customStyles="100%"
        image={pin.PicFile}
        setPin={setPin}
        pin={pin}
      >
      </WavyHeader>
    </div>
  );
}
