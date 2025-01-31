import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { getDiveShopById, updateDiveShop } from '../../../supabaseCalls/shopsSupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { ModalContext } from '../../reusables/modal/context';
import ShopModalView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorListModal from '../tripCreatorListModal';
import { MapContext } from '../../googleMap/mapContext';
import { DiveShopContext } from '../../contexts/diveShopContext';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';

type ShopModalProps = Partial<ModalHandleProps> & {
  id?:    number
  panTo?: boolean
};

export default function ShopModal(props: ShopModalProps) {
  const { selectedShop, setSelectedShop } = useContext(DiveShopContext);
  const { profile } = useContext(UserProfileContext);
  const [isMyShop, setIsMyShop] = useState<boolean>(false);
  const [headerPictureUrl, setHeaderPictureUrl] = useState<string | null>(null);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const { modalShow } = useContext(ModalContext);
  const mapContext = useContext(MapContext);

  useEffect(() => {
    (async () => {
      if (props.id) {
        const shop = await getDiveShopById(props.id);
        if (shop) {
          setSelectedShop(shop);
        }
      }
    })();
  }, [props.id]);

  useEffect(() => {
    if (props.panTo && selectedShop && mapContext.mapRef) {
      const latlng = new google.maps.LatLng(selectedShop.lat, selectedShop.lng);
      mapContext.mapRef.panTo(latlng);
    }
  }, [props.panTo, selectedShop]);

  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
    if (
      (profile?.partnerAccount)
      && (selectedShop?.userId === profile.UserID)
    ) {
      setIsMyShop(true);
    } else {
      setIsMyShop(false);
    }
  }, [selectedShop, profile]);

  const getItineraries = async (IdNum: number) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins) {
        setItineraryList(itins);
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

  const handleDiveShopBioChange = async (newValue: string) => {
    if (selectedShop) {
      await updateDiveShop({ id: selectedShop.id, bio: newValue, photo: selectedShop.diveshopprofilephoto });
    }
  };

  const handleImageSelection = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedShop) {
      return;
    }
    if (selectedShop.diveshopprofilephoto) {
      clearPreviousImage(selectedShop.diveshopprofilephoto);
    }

    const createFileName = await handleImageUpload(event);
    setSelectedShop({
      ...selectedShop,
      diveshopprofilephoto: `animalphotos/public/${createFileName}`,
    });
  };

  const openTripCreatorList = async () => {
    modalShow(TripCreatorListModal, {
      keepPreviousModal: true,
      size:              'medium',
      // isEditModeOn:      false,
    });
  };

  useEffect(() => {
    if (selectedShop?.diveshopprofilephoto) {
      const photoName = getPhotoPublicUrl(selectedShop.diveshopprofilephoto);
      setHeaderPictureUrl(photoName);
    } else {
      setHeaderPictureUrl(null);
    }
  }, [selectedShop?.diveshopprofilephoto]);


  return (
    <>
      {selectedShop && (
        <ShopModalView
          onClose={props.onModalCancel}
          handleDiveShopBioChange={handleDiveShopBioChange}
          diveShop={selectedShop}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          headerPictureUrl={headerPictureUrl}
          openTripCreatorList={openTripCreatorList}
          isMyShop={isMyShop}
          handleDiveShopImageSelection={handleImageSelection}
        />
      )}
    </>
  );
}
