import React, { useState, useContext, useEffect } from 'react';
import DiveSiteView from './view';
import { updateDiveSite } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { SelectedDiveSiteContext } from '../../contexts/selectedDiveSiteContext';
import { PhotosGroupedByDate } from '../../../entities/photos';
import { getPhotosByDiveSiteWithExtra } from '../../../supabaseCalls/photoSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { PinContext } from '../../contexts/staticPinContext';
import { ModalContext } from '../../reusables/modal/context';
import PicUploader from '../picUploader/index';
import { ModalHandleProps } from '../../reusables/modal/types';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { ActiveProfile } from '../../../entities/profile';

type DiveSiteProps = Partial<ModalHandleProps>;
export default function DiveSite(props: DiveSiteProps) {
  const { selectedDiveSite, setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { profile }          = useContext(UserProfileContext);
  const { modalShow }        = useContext(ModalContext);
  const { pin, setPin }      = useContext(PinContext);

  // const [diveSite, setDiveSite] = useState<DiveSiteWithUserName | null>(null);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);

  useEffect(() => {
    if (selectedDiveSite) {
      getPhotos(selectedDiveSite, profile);
    }
  }, [selectedDiveSite]);


  useEffect(() => {
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, []);

  const getPhotos = async (site: DiveSiteWithUserName, user: ActiveProfile| null) => {
    try {
      const photos = await getPhotosByDiveSiteWithExtra({
        lat:    site.lat,
        lng:    site.lng,
        userId: profile?.UserID,
      });
      if (photos && photos.length > 0) {
        setDiveSitePics(photos);
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedDiveSite) {
      return;
    }
    if (selectedDiveSite.divesiteprofilephoto) {
      clearPreviousImage(selectedDiveSite.divesiteprofilephoto);
    }

    const createFileName = await handleImageUpload(event);
    setSelectedDiveSite({
      ...selectedDiveSite,
      divesiteprofilephoto: `animalphotos/public/${createFileName}`,
    });
  };

  const openPicUploader = () => {
    if (selectedDiveSite) {
      setPin({
        ...pin,
        Latitude:  String(selectedDiveSite.lat),
        Longitude: String(selectedDiveSite.lng),
        siteName:  selectedDiveSite.name,
      });
    }


    modalShow(PicUploader);
  };



  useEffect(() => {
    if (selectedDiveSite?.divesiteprofilephoto) {
      const photoName = selectedDiveSite.divesiteprofilephoto.split('/').pop();
      setHeaderPictureUrl(
        import.meta.env.VITE_CLOUDFLARE_R2_BUCKET_PATH + `${photoName}`,
      );
    } else {
      setHeaderPictureUrl(null);
    }
  }, [selectedDiveSite?.divesiteprofilephoto]);

  return (
    <DiveSiteView
      onClose={props.onModalCancel}
      openPicUploader={openPicUploader}
      handleImageSelection={handleImageSelection}
      diveSite={selectedDiveSite}
      diveSitePics={diveSitePics}
      isPartnerAccount={isPartnerAccount}
      headerPictureUrl={headerPictureUrl}
      onDiveSiteBioChange={async (newValue) => {
        if (selectedDiveSite) {
          setSelectedDiveSite({ ...selectedDiveSite, divesitebio: newValue });
          try {
            await updateDiveSite({
              id:    selectedDiveSite.id,
              bio:   newValue,
              photo: selectedDiveSite.divesiteprofilephoto,
            });
          } catch (e) {
            console.log({ title: 'Error19', message: e.message });
          }
        }
      }}
    />
  );
}
