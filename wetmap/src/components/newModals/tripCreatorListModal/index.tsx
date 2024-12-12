import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { updateDiveShop } from '../../../supabaseCalls/shopsSupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ItineraryItem } from './types';
import TripCreatorListView from './view';
import { ModalHandleProps } from '../../reusables/modal/types';

type TripCreatorListProps = Partial<ModalHandleProps>;

// const setupDiveShopModal = async (shopName: string, modalShow: ModalShow, setSelectedShop: (shop: DiveShop) => void) => {
//   modalShow(ShopModal, {
//     size: 'large',
//   });
//   const chosenShop = await getShopByName(shopName);
//   setSelectedShop(chosenShop[0]);
// };

export default function TripCreatorListModal(props: TripCreatorListProps) {
  const { selectedShop } = useContext(SelectedShopContext);
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

  return (
    <>
      {selectedShop && (
        <TripCreatorListView
          setSelectedID={setSelectedID}
          onClose={props.onModalCancel}
          handleDiveShopBioChange={handleDiveShopBioChange}
          handleDiveShopImageSelection={() => {}}
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
