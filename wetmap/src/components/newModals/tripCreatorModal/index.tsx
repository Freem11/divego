import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorView from './view';
import { DiveShopContext } from '../../contexts/diveShopContext';
import { Form } from './form';

type TripCreatorModalProps = Partial<ModalHandleProps>;

export default function TripCreatorModal({ onModalCancel }: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);

  const isEditModeOn = false;


  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

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

  const onSubmit = async (formData: Form) => {
    // const { error } = await insertDiveSiteWaits({
    //   Site:      formData.Site,
    //   Latitude:  formData.Latitude,
    //   Longitude: formData.Longitude,
    //   UserID:    profile && profile.UserID,
    // });

    // if (error) {
    //   toast.error(screenData.DiveSiteAdd.addSiteError);
    // } else {
    //   toast.success(screenData.DiveSiteAdd.addSiteSuccess);
    // }
    // onClose();
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={onModalCancel}
          onSubmit={onSubmit}
          isEditModeOn={isEditModeOn}
        />
      )}
    </>
  );
}
