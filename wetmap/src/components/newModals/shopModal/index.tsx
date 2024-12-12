import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { updateDiveShop } from '../../../supabaseCalls/shopsSupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ItineraryItem } from './types';
import { ModalContext } from '../../reusables/modal/context';
import ShopModalView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorListModal from '../tripCreatorListModal/index';

type ShopModalProps = Partial<ModalHandleProps>;

export default function ShopModal(props: ShopModalProps) {
  const { selectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);

  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const [selectedID, setSelectedID] = useState<number>(0);
  const modalContext = useContext(ModalContext);
  const { modalShow } = useContext(ModalContext);

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


  const openTripCreatorList = async () => {
    modalContext.modalCancel();
    modalShow(TripCreatorListModal, {
      size: 'large',
    });
  };


  return (
    <>
      {selectedShop && (
        <ShopModalView
          setSelectedID={setSelectedID}
          onClose={props.onModalCancel}
          handleDiveShopBioChange={handleDiveShopBioChange}
          handleDiveShopImageSelection={() => {}}
          diveShop={selectedShop}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={null}
          openTripCreatorList={openTripCreatorList}
        />
      )}
    </>
  );
}
