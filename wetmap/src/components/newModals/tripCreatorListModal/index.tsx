import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ItineraryItem } from '../../../entities/itineraryItem';
import TripCreatorListView from './view';
import { getShopByUserID } from '../../../supabaseCalls/shopsSupabaseCalls';
import TripCreatorModal from '../tripCreatorModal';
import { ModalContext } from '../../reusables/modal/context';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { EditModeContext } from '../../contexts/editModeContext';

export default function TripCreatorListModal() {
  const { profile } = useContext(UserProfileContext);
  const { modalShow, modalCancel } = useContext(ModalContext);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const { setSelectedShop, selectedShop } = useContext(DiveShopContext);
  const { setIsEditModeOn } = useContext(EditModeContext);

  useEffect(() => {
    if (profile) {
      getShop(profile?.UserID);
    }

    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

  const getShop = async (id: string) => {
    try {
      const shop = await getShopByUserID(id);
      if (shop) {
        setSelectedShop(shop[0]);
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

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

  const openTripCreator = async () => {
    setIsEditModeOn(false);
    modalShow(TripCreatorModal, {
      keepPreviousModal: true,
      size:              'large',
    });
  };

  return (
    <>
      <TripCreatorListView
        itineraryList={itineraryList}
        headerPictureUrl={null}
        onClose={modalCancel}
        openTripCreator={openTripCreator}
      />
    </>
  );
}
