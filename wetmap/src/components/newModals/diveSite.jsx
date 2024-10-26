import React, { useState, useContext, useEffect } from 'react';
import screenData from './screenData.json';
import style from './modalContent.module.scss';
import { FormGroup, Input } from 'reactstrap';
import Picture from '../modals/picture';
import Button from './button';
import WavyHeader from './wavyHeader';
import PlainTextInput from '../newModals/plaintextInput';
import { PinContext } from '../contexts/staticPinContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { UserProfileContext } from '../contexts/userProfileContext';
import {
  getDiveSiteWithUserName,
  updateDiveSite,
} from '../../supabaseCalls/diveSiteSupabaseCalls';
import {
  getPhotosWithUser,
  getPhotosWithUserEmpty,
  getPhotosByDiveSiteWithExtra,
} from '../../supabaseCalls/photoSupabaseCalls';
import { handleImageUpload, clearPreviousImage } from './imageUploadHelpers';
import defaultImage from '../../images/blackManta.png';
import Icon from '../../icons/Icon';
import { ModalContext } from '../contexts/modalContext';
import PicUploader from '../newModals/picUploader';
import { cleanupPinPicture } from '../../helpers/picUploaderHelpers';

const screenWidthInital = window.innerWidth;
const screenHeitghInital = window.innerHeight;

export default function DiveSite(props) {
  const { onModalCancel } = props;
  const { modalShow } = useContext(ModalContext);
  const { profile } = useContext(UserProfileContext);
  const { pin, setPin } = useContext(PinContext);
  const [site, setSite] = useState('');
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const [diveSitePics, setDiveSitePics] = useState([]);
  const [picUrl, setPicUrl] = useState(defaultImage);
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);

  useEffect(() => {
    if (!isEditModeOn && site) {
      diveSiteUpdateUpdate();
    }
  }, [isEditModeOn]);

  const diveSiteUpdateUpdate = async () => {
    try {
      const success = await updateDiveSite({
        id:    site.id,
        bio:   site.divesitebio,
        photo: site.divesiteprofilephoto,
      });
    } catch (e) {
      console.log({ title: 'Error19', message: e.message });
    }
  };

  function handleClick() {
    document.getElementById('file').click();
  }

  const handleImageSelection = async (e) => {
    if (e.target && e.target.name === 'picFile') {
      if (site.photo !== null) {
        clearPreviousImage(site.photo);
      }

      const createFileName = await handleImageUpload(e);
      setSite({
        ...site,
        photo: `animalphotos/public/${createFileName}`,
      });
    }
  };

  useEffect(() => {
    if (site.photo) {
      let photoName = site.photo.split('/').pop();
      setPicUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`,
      );
    } else {
      setPicUrl(null);
    }
  }, [site.photo]);

  const getPhotos = async () => {
    const success = await getPhotosByDiveSiteWithExtra({
      lat:    selectedDiveSite.Latitude,
      lng:    selectedDiveSite.Longitude,
      userId: profile[0].UserID,
    });
    setDiveSitePics(success);
  };

  const getDiveSite = async (chosenSite) => {
    try {
      const selectedSite = await getDiveSiteWithUserName({
        siteName: chosenSite.SiteName,
      });
      if (selectedSite.length > 0) {
        setSite(selectedSite[0]);
      }
    } catch (e) {
      console.log({ title: 'Error98', message: e.message });
    }
  };

  useEffect(() => {
    getPhotos();
    getDiveSite(selectedDiveSite);
  }, []);

  useEffect(() => {
    if (profile[0].partnerAccount) {
      setIsPartnerAccount(true);
    }
    getPhotos();
    getDiveSite(selectedDiveSite);
  }, [selectedDiveSite]);

  const onClose = async () => {
    if (site.photo !== null || site.photo === '') {
      await clearPreviousImage(site.photo);
    }
    // setLevelTwoScreen(false);
    setSite({
      ...site,
      photo: null,
    });
  };

  window.addEventListener('resize', trackDimensions);

  const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  function trackDimensions() {
    setWindowWidth(window.innerWidth);
    setWindowHeigth(window.innerHeight);
  }

  const openPicUploader = () => {
    setPin({
      ...pin,
      Latitude:  String(selectedDiveSite.Latitude),
      Longitude: String(selectedDiveSite.Longitude),
      siteName:  selectedDiveSite.SiteName,
    });

    modalShow(PicUploader, {
      onCancelCallback: () => cleanupPinPicture(pin),
    });
  };

  return (
    <div
      className="$themeWhite"
      style={{
        display:         'flex',
        width:           '100%',
        height:          '100%',
        backgroundColor: '$themeWhite',
        marginBottom:    '100%',
      }}
    >
      <div
        style={{
          width:  '50%',
          height: '100%',
        }}
      >
        <div className={style.backButton} style={{ position: 'absolute' }}>
          <Icon
            name="chevron-left"
            fill="white"
            width="60px"
            onClick={() => onModalCancel()}
          />
        </div>


        <div style={{ position: 'absolute', top: '4%', left: '28%' }}>
          <Button
            onClick={() => openPicUploader()}
            btnText={screenData.DiveSite.addSightingButton}
            altStyle={true}
            icon={false}
          />
        </div>

        <div
          className={style.picZoneHalf}
          // style={{backgroundImage: `url(${defaultImage})`}}
        >
          {/* {picUrl ?
            <img src={picUrl} width={"100%"} className={style.picStylesHalf}></img>
            :
            <img src={defaultImage} width={"100%"} className={style.picStylesHalf}></img>
          } */}

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
              name="picFile"
              bsSize="lg"
              onChange={handleImageSelection}
            >
            </Input>
          </FormGroup>


          <div
            style={{ position: 'absolute', right: '53%', top: '37%' }}
          >
            <Icon
              name="camera-plus"
              fill="white"
              width="40px"
              onClick={() => handleClick()}
            />
          </div>
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
            zIndex:         22,
            // marginTop: '-10%'
          }}
        >
          <div
            style={{
              height:       400,
              width:        '100%',
              marginLeft:   '5%',
              marginBottom: '5%',
              overflowY:    'auto',
              // zIndex: 2
            }}
          >
            <p className={style.headerText}>{site.name}</p>
            <p className={style.creditLabel}>
              {`Added By: ${site.newusername}`}
            </p>
            <div
              style={{
                // marginBottom: "20%",
                width:      '100%',
                alignItems: 'center',
                // backgroundColor: 'pink'
              }}
            >
              <PlainTextInput
                placeHolder={`A little about ${site.name}`}
                content={site.divesitebio}
                isPartnerAccount={isPartnerAccount}
                isEditModeOn={isEditModeOn}
                setIsEditModeOn={setIsEditModeOn}
                onChangeText={bioText => setSite({ ...site, divesitebio: bioText.target.value })}
              />
            </div>
          </div>
        </div>

        <WavyHeader
          customStyles="50%"
          image={site.photo}
          setPin={setSite}
          pin={site}
        >
        </WavyHeader>
      </div>
      <div
        style={{
          // marginTop:       '1%',
          width:           '50%',
          height:          '97%',
          // backgroundColor: 'pink',
          display:         'flex',
          flexDirection:   'column',
        }}
      >
        <div className="text-normal1 text-large1">{screenData.DiveSite.drawerHeader}</div>
        <div className={style.drawerBody}>
          {diveSitePics.map((packet) => {
            return (
              <div key={packet.dateTaken}>
                <div className={style.dateAndSiteLabels}>{packet.dateTaken}</div>
                {packet.photos
                && packet.photos.map((pic) => {
                  return <Picture key={pic.id} pic={pic}></Picture>;
                })}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
