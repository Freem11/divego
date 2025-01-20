import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ItineraryItem } from '../../../entities/itineraryItem';
import TripCreatorView from './view';
import { Form } from './form';
import { ModalHandleProps } from '../../reusables/modal/types';

type TripCreatorProps = Partial<ModalHandleProps>;

export default function TripCreatorModal(props: TripCreatorProps) {
  const { selectedShop } = useContext(SelectedShopContext);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);

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

  const onSubmit = (data: Form) => {
    console.log(data, data.Start);
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          onClose={props.onModalCancel}
          onSubmit={onSubmit}
          isEditModeOn={props.isEditModeOn}
        />
      )}
    </>
  );
}
