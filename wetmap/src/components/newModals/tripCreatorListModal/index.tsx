import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ItineraryItem } from '../../../entities/itineraryItem';
import TripCreatorListView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorModal from '../tripCreatorModal';
import { ModalContext } from '../../reusables/modal/context';

type TripCreatorListModalProps = Partial<ModalHandleProps>;

export default function TripCreatorListModal({ onModalCancel }: TripCreatorListModalProps) {
  const { selectedShop } = useContext(SelectedShopContext);
  const { modalShow } = useContext(ModalContext);
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

  const openTripCreator = async () => {
    modalShow(TripCreatorModal, {
      keepPreviousModal: true,
      size:              'medium',
    });
  };

  return (
    <>
      {selectedShop && (
        <TripCreatorListView
          itineraryList={itineraryList}
          headerPictureUrl={null}
          onClose={onModalCancel}
          openTripCreator={openTripCreator}
        />
      )}
    </>
  );
}
