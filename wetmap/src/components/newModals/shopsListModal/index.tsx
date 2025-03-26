import React, { useState, useContext, useEffect } from 'react';
import { UserProfileContext } from '../../contexts/userProfileContext';
import ShopsListView from './view';
import { getShopByUserID } from '../../../supabaseCalls/shopsSupabaseCalls';
import TripCreatorModal from '../tripCreatorModal';
import { ModalContext } from '../../reusables/modal/context';
import { DiveShop } from '../../../entities/diveShop';
import ShopSubmitter from '../shopSubmitter';

export default function ShopsListModal() {
  const { profile } = useContext(UserProfileContext);
  const { modalShow, modalCancel } = useContext(ModalContext);
  const [listOfShops, setListOfShops] = useState<DiveShop[]>([]);

  useEffect(() => {
    if (profile) {
      getShops(profile?.UserID);
    }
  }, []);

  const getShops = async (id: string) => {
    try {
      const shops = await getShopByUserID(id);
      if (shops) {
        setListOfShops(shops);
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

  const openTripCreator = async () => {
    modalShow(TripCreatorModal, {
      keepPreviousModal: true,
      size:              'large',
      isEditModeOn:      false,
    });
  };

  const openDiveCenterSubmitter = async () => {
    modalShow(ShopSubmitter, {
      keepPreviousModal: true,
      size:              'medium',

    });
  };
  return (
    <>
      <ShopsListView
        listOfShops={listOfShops}
        onClose={modalCancel}
        openTripCreator={openTripCreator}
        openDiveCenterSubmitter={openDiveCenterSubmitter}
      />
    </>
  );
}
