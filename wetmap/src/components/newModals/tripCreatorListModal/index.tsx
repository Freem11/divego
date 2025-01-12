import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ItineraryItem } from '../../../entities/itineraryItem';
import TripCreatorListView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';
import { getShopByUserID } from '../../../supabaseCalls/shopsSupabaseCalls';

type TripCreatorListProps = Partial<ModalHandleProps>;

export default function TripCreatorListModal(props: TripCreatorListProps) {
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const [selectedID, setSelectedID] = useState<number>(0);

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
