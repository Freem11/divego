import React, { useState, useContext, useEffect } from 'react';
import DiveSiteView from './view';
import { getDiveSiteWithUserName, updateDiveSite } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
// import screenData from './screenData.json';
// import style from './modalContent.module.scss';
// import { FormGroup, Input } from 'reactstrap';
// import Picture from '../modals/picture';
// import Button from './button';
// import WavyHeader from './wavyHeader';
// import PlainTextInput from '../newModals/plaintextInput';
// import { PinContext } from '../contexts/staticPinContext';
import { SelectedDiveSiteContext } from '../../contexts/selectedDiveSiteContext';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { getPhotosByDiveSiteWithExtra } from '../../../supabaseCalls/photoSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
// import {
//   getDiveSiteWithUserName,
//   updateDiveSite,
// } from '../../supabaseCalls/diveSiteSupabaseCalls';
// import {
//   getPhotosWithUser,
//   getPhotosWithUserEmpty,
//   getPhotosByDiveSiteWithExtra,
// } from '../../supabaseCalls/photoSupabaseCalls';
// import { handleImageUpload, clearPreviousImage } from './imageUploadHelpers';
// import defaultImage from '../../images/blackManta.png';
// import Icon from '../../icons/Icon';
// import { ModalContext } from '../contexts/modalContext';
// import PicUploader from '../newModals/picUploader';
// import { cleanupPinPicture } from '../../helpers/picUploaderHelpers';
// import DiveSiteView from './view';

// const screenWidthInital = window.innerWidth;
// const screenHeitghInital = window.innerHeight;

export default function DiveSite(props) {
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { profile }          = useContext(UserProfileContext);

  const [diveSite, setDiveSite] = useState<DiveSiteWithUserName | null>(null);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);

  const getPhotos = async () => {
    const success = await getPhotosByDiveSiteWithExtra({
      lat:    selectedDiveSite.Latitude,
      lng:    selectedDiveSite.Longitude,
      userId: profile[0].UserID,
    });
    setDiveSitePics(success);
  };

  const getDiveSite = async () => {
    try {
      const selectedSite = await getDiveSiteWithUserName({
        siteName: selectedDiveSite.SiteName,
      });
      if (selectedSite.length > 0) {
        setDiveSite(selectedSite[0]);
      }
    } catch (e) {
      console.log({ title: 'Error98', message: e.message });
    }
  };

  const diveSiteUpdateUpdate = async () => {
    if (!diveSite) {
      return;
    }
    try {
      await updateDiveSite({
        id:    diveSite.id,
        bio:   diveSite.divesitebio,
        photo: diveSite.divesiteprofilephoto,
      });
    } catch (e) {
      console.log({ title: 'Error19', message: e.message });
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!diveSite) {
      return;
    }
    if (diveSite.photo) {
      clearPreviousImage(diveSite.photo);
    }

    const createFileName = await handleImageUpload(event);
    setDiveSite({
      ...diveSite,
      photo: `animalphotos/public/${createFileName}`,
    });
  };

  useEffect(() => {
    getPhotos();
    getDiveSite();
  }, []);

  useEffect(() => {
    if (diveSite?.photo) {
      const photoName = diveSite.photo.split('/').pop();
      setHeaderPictureUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`,
      );
    } else {
      setHeaderPictureUrl(null);
    }
  }, [diveSite?.photo]);

  return (
    <DiveSiteView
      onModalCancel={props.onModalCancel}
      openPicUploader={() => {}}
      handleImageSelection={handleImageSelection}
      onDiveSiteBioChange={(newValue) => {
        if (diveSite) {
          setDiveSite({ ...diveSite, divesitebio: newValue });
        }
      }}
      diveSite={diveSite}
      diveSitePics={diveSitePics}
      isPartnerAccount={true}
      headerPictureUrl={headerPictureUrl}
    />
  );

  // const { onModalCancel } = props;
  // const { modalShow } = useContext(ModalContext);
  // const { profile } = useContext(UserProfileContext);
  // const { pin, setPin } = useContext(PinContext);
  // const [site, setSite] = useState('');
  // const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  // const [diveSitePics, setDiveSitePics] = useState([]);
  // const [picUrl, setPicUrl] = useState(defaultImage);
  // const [isEditModeOn, setIsEditModeOn] = useState(false);
  // const [isPartnerAccount, setIsPartnerAccount] = useState(false);

  // useEffect(() => {
  //   if (!isEditModeOn && site) {
  //     diveSiteUpdateUpdate();
  //   }
  // }, [isEditModeOn]);

  // const diveSiteUpdateUpdate = async () => {
  //   try {
  //     const success = await updateDiveSite({
  //       id:    site.id,
  //       bio:   site.divesitebio,
  //       photo: site.divesiteprofilephoto,
  //     });
  //   } catch (e) {
  //     console.log({ title: 'Error19', message: e.message });
  //   }
  // };

  // function handleClick() {
  //   document.getElementById('file').click();
  // }

  // const handleImageSelection = async (e) => {
  //   if (e.target && e.target.name === 'picFile') {
  //     if (site.photo !== null) {
  //       clearPreviousImage(site.photo);
  //     }

  //     const createFileName = await handleImageUpload(e);
  //     setSite({
  //       ...site,
  //       photo: `animalphotos/public/${createFileName}`,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (site.photo) {
  //     let photoName = site.photo.split('/').pop();
  //     setPicUrl(
  //       import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`,
  //     );
  //   } else {
  //     setPicUrl(null);
  //   }
  // }, [site.photo]);

  // const getPhotos = async () => {
  //   const success = await getPhotosByDiveSiteWithExtra({
  //     lat:    selectedDiveSite.Latitude,
  //     lng:    selectedDiveSite.Longitude,
  //     userId: profile[0].UserID,
  //   });
  //   setDiveSitePics(success);
  // };

  // const getDiveSite = async (chosenSite) => {
  //   try {
  //     const selectedSite = await getDiveSiteWithUserName({
  //       siteName: chosenSite.SiteName,
  //     });
  //     if (selectedSite.length > 0) {
  //       setSite(selectedSite[0]);
  //     }
  //   } catch (e) {
  //     console.log({ title: 'Error98', message: e.message });
  //   }
  // };

  // useEffect(() => {
  //   getPhotos();
  //   getDiveSite(selectedDiveSite);
  // }, []);

  // useEffect(() => {
  //   if (profile[0].partnerAccount) {
  //     setIsPartnerAccount(true);
  //   }
  //   getPhotos();
  //   getDiveSite(selectedDiveSite);
  // }, [selectedDiveSite]);

  // const onClose = async () => {
  //   if (site.photo !== null || site.photo === '') {
  //     await clearPreviousImage(site.photo);
  //   }
  //   // setLevelTwoScreen(false);
  //   setSite({
  //     ...site,
  //     photo: null,
  //   });
  // };

  // window.addEventListener('resize', trackDimensions);

  // const [windowWidth, setWindowWidth] = useState(screenWidthInital);
  // const [windowHeight, setWindowHeigth] = useState(screenHeitghInital);

  // function trackDimensions() {
  //   setWindowWidth(window.innerWidth);
  //   setWindowHeigth(window.innerHeight);
  // }

  // const openPicUploader = () => {
  //   setPin({
  //     ...pin,
  //     Latitude:  String(selectedDiveSite.Latitude),
  //     Longitude: String(selectedDiveSite.Longitude),
  //     siteName:  selectedDiveSite.SiteName,
  //   });

  //   modalShow(PicUploader, {
  //     onCancelCallback: () => cleanupPinPicture(pin),
  //   });
  // };
}
