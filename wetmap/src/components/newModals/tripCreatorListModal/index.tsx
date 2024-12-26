import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ModalContext } from '../../reusables/modal/context';
import { ItineraryItem } from './types';
import TripCreatorListView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import DiveShopModal from '../shopModal/index';

type TripCreatorListProps = Partial<ModalHandleProps>;

export default function TripCreatorListModal(props: TripCreatorListProps) {
  const { selectedShop } = useContext(SelectedShopContext);

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
        <TripCreatorListView
          setSelectedID={setSelectedID}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={null}
          onClose={props.onModalCancel}
        />
      )}
    </>
  );
}
