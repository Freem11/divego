import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { ModalHandleProps } from '../../reusables/modal/types';
import TripCreatorView from './view';
import { DiveShopContext } from '../../contexts/diveShopContext';

type TripCreatorModalProps = Partial<ModalHandleProps>;

export default function TripCreatorModal({ onModalCancel }: TripCreatorModalProps) {
  const { selectedShop } = useContext(DiveShopContext);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const [selectedID, setSelectedID] = useState<number>(0);

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

  return (
    <>
      {selectedShop && (
        <TripCreatorView
          setSelectedID={setSelectedID}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={null}
          onClose={onModalCancel}
        />
      )}
    </>
  );
}
