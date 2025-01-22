import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { updateDiveShop, insertDocument, readAllTestRecords } from '../../../supabaseCalls/shopsSupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { ModalContext } from '../../reusables/modal/context';
import ShopModalView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorListModal from '../tripCreatorListModal';

type ShopModalProps = Partial<ModalHandleProps>;

export default function ShopModal(props: ShopModalProps) {
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);
  const [isMyShop, setIsMyShop] = useState<boolean>(false);
  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const { modalShow } = useContext(ModalContext);

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

  const handleInsertTest = async () => {
    await insertDocument();
  };

  const handleSelectTest = async () => {
    await readAllTestRecords();
  }

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
    });
  };


  return (
    <>
      {selectedShop && (
        <ShopModalView
          onClose={props.onModalCancel}
          handleDiveShopBioChange={handleDiveShopBioChange}
          diveShop={selectedShop}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          headerPictureUrl={null}
          openTripCreatorList={openTripCreatorList}
          isMyShop={isMyShop}
          handleInsertTest={handleInsertTest}
          handleSelectTest={handleSelectTest}
          handleDiveShopImageSelection={handleImageSelection}
        />
      )}
    </>
  );
}
