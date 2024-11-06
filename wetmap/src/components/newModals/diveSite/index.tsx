import React, { useState, useContext, useEffect } from 'react';
import DiveSiteView from './view';
import { getDiveSiteWithUserName, updateDiveSite } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { SelectedDiveSiteContext } from '../../contexts/selectedDiveSiteContext';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { getPhotosByDiveSiteWithExtra } from '../../../supabaseCalls/photoSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { PinContext } from '../../contexts/staticPinContext';
import { ModalContext } from '../../contexts/modalContext';
import PicUploader from '../picUploader/index';


export default function DiveSite(props) {
  const { selectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { profile }          = useContext(UserProfileContext);
  const { modalShow }        = useContext(ModalContext);
  const { pin, setPin }      = useContext(PinContext);

  const [diveSite, setDiveSite] = useState<DiveSiteWithUserName | null>(null);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);


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

  const openPicUploader = () => {
    setPin({
      ...pin,
      Latitude:  String(selectedDiveSite.Latitude),
      Longitude: String(selectedDiveSite.Longitude),
      siteName:  selectedDiveSite.SiteName,
    });

    modalShow(PicUploader, {
      // onCancelCallback: () => cleanupPinPicture(pin),
    });
  };

  useEffect(() => {
    if (profile[0].partnerAccount) {
      setIsPartnerAccount(true);
    }
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
      onClose={props.onModalCancel}
      openPicUploader={openPicUploader}
      handleImageSelection={handleImageSelection}
      diveSite={diveSite}
      diveSitePics={diveSitePics}
      isPartnerAccount={isPartnerAccount}
      headerPictureUrl={headerPictureUrl}
      onDiveSiteBioChange={async (newValue) => {
        if (diveSite) {
          setDiveSite({ ...diveSite, divesitebio: newValue });
          try {
            await updateDiveSite({
              id:    diveSite.id,
              bio:   newValue,
              photo: diveSite.divesiteprofilephoto,
            });
          } catch (e) {
            console.log({ title: 'Error19', message: e.message });
          }
        }
      }}
    />
  );
}
