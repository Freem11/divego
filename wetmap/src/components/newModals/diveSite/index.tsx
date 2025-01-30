import React, { useState, useContext, useEffect } from 'react';
import DiveSiteView from './view';
import { getDiveSitesByIDs, updateDiveSite, getDiveSiteById } from '../../../supabaseCalls/diveSiteSupabaseCalls';
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
import { MapContext } from '../../googleMap/mapContext';
import { DiveSiteContext } from '../../contexts/diveSiteContext';
import UserProfile from '../userProfile';

type DiveSiteProps = Partial<ModalHandleProps> & {
  id?:    number
  panTo?: boolean
};
export default function DiveSite(props: DiveSiteProps) {
  const { selectedDiveSite, setSelectedDiveSite } = useContext(DiveSiteContext);
  const { profile }          = useContext(UserProfileContext);
  const { modalShow }        = useContext(ModalContext);
  const { pin, setPin }      = useContext(PinContext);
  const [diveSitePics, setDiveSitePics] = useState<PhotosGroupedByDate[] | null>(null);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const mapContext = useContext(MapContext);

  useEffect(() => {
    (async () => {
      if (props.id) {
        const diveSites = await getDiveSiteById(props.id);
        if (diveSites && diveSites.length) {
          setSelectedDiveSite(diveSites[0]);
        }
      }
    })();
  }, [props.id]);

  useEffect(() => {
    if (props.panTo && selectedDiveSite && mapContext.mapRef) {
      const latlng = new google.maps.LatLng(selectedDiveSite.lat, selectedDiveSite.lng);
      mapContext.mapRef.panTo(latlng);
    }
  }, [selectedDiveSite, props.panTo]);

  useEffect(() => {
    if (selectedDiveSite) {
      getPhotos(selectedDiveSite, profile);
    }
  }, [selectedDiveSite, profile]);

  useEffect(() => {
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, [profile]);

  const getPhotos = async (site: DiveSiteWithUserName, user: ActiveProfile | null) => {
    try {
      const photos = await getPhotosByDiveSiteWithExtra({
        lat:    site.lat,
        lng:    site.lng,
        userId: user?.UserID,
      });
      if (photos) {
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
    setSelectedDiveSite((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        divesiteprofilephoto: `animalphotos/public/${createFileName}`,
      };
    });
  };

  const openPicUploader = () => {
    if (selectedDiveSite) {
      setPin({
        ...pin,
        Latitude:  selectedDiveSite.lat,
        Longitude: selectedDiveSite.lng,
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

  const handleProfileSwitch = async (userId: string) => {
    if (profile?.UserID === userId) {
      return;
    }
    modalShow(UserProfile, {
      keepPreviousModal: true,
      userProfileID:     userId,
      size:              'large',

    });
  };

  return (
    <DiveSiteView
      onClose={props.onModalCancel}
      openPicUploader={openPicUploader}
      handleImageSelection={handleImageSelection}
      handleProfileSwitch={handleProfileSwitch}
      diveSite={selectedDiveSite}
      diveSitePics={diveSitePics}
      isPartnerAccount={isPartnerAccount}
      headerPictureUrl={headerPictureUrl}
      onDiveSiteBioChange={async (newValue) => {
        if (selectedDiveSite) {
          try {
            await updateDiveSite({
              id:    selectedDiveSite.id,
              bio:   newValue,
              photo: selectedDiveSite.divesiteprofilephoto,
            });
          } catch (e) {
            console.log({ title: 'Error19', message: (e as Error).message });
          }
        }
      }}
    />
  );
}
