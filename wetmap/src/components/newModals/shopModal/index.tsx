import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { updateDiveShop } from '../../../supabaseCalls/shopsSupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { clearPreviousImage, handleImageUpload } from '../imageUploadHelpers';
import { ItineraryItem } from './types';
import ShopModalView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';

type ShopModalProps = Partial<ModalHandleProps>;

export default function ShopModal(props: ShopModalProps) {
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);

  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const [selectedID, setSelectedID] = useState<number>(0);

  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

  useEffect(() => {
    if (profile && profile.partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, []);

  const getItineraries = async (IdNum: number) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins && itins.length > 0) {
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

  return (
    <>
      {selectedShop && (
        <ShopModalView
          setSelectedID={setSelectedID}
          onClose={props.onModalCancel}
          handleImageSelection={handleImageSelection}
          handleDiveShopBioChange={handleDiveShopBioChange}
          diveShop={selectedShop}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={null}
        />
      )}
    </>
  );
}
