import React, { useState, useContext, useEffect } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { updateDiveShop } from '../../../supabaseCalls/shopsSupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ShopModalContext } from '../../contexts/shopModalContext';
import { MasterContext } from '../../contexts/masterContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import { ItineraryItem } from './types';
import ShopModalView from './view';

export default function ShopModal(props) {
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [itineraryList, setItineraryList] = useState<ItineraryItem[]>([]);
  const [selectedID, setSelectedID] = useState<number>(0);

  useEffect(() => {
    if (selectedShop[0]) {
      getItineraries(selectedShop[0].id);
      setMasterSwitch(true);
    }
  }, [selectedShop]);

  useEffect(() => {
    if (profile[0].partnerAccount) {
      setIsPartnerAccount(true);
    }
  }, []);

  useEffect(() => {
    if (shopModal && zoomHelper) {
      setMapCoords([selectedShop[0].lat, selectedShop[0].lng]);
    }
  }, [shopModal]);

  const getItineraries = async (IdNum: number) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins && itins.length > 0) {
        setItineraryList(itins.map(itin => ({
          BookingPage: itin.BookingPage,
          created_at:  itin.created_at,
          description: itin.description,
          id:          itin.id,
          name:        itin.name,
          shop_id:     itin.shop_id,
          updated_at:  itin.updated_at,
          user_id:     itin.user_id,
          price:       itin.price,
          shopID:      itin.shopID,
          siteList:    itin.siteList,
          startDate:   itin.startDate,
          tripName:    itin.tripName,
        })));
      }
    } catch (e) {
      console.log({ title: 'Error', message: (e as Error).message });
    }
  };

  const handleShopModalClose = () => {
    props.onModalCancel();
    setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
    setItineraryList([]);
  };

  const handleDiveShopBioChange = async (newValue: string) => {
    if (selectedShop[0]) {
      await updateDiveShop({ id: selectedShop[0].id, bio: newValue, photo: selectedShop[0].diveShopProfilePhoto });
    }
  };

  console.log('selectedShop:', selectedShop[0]);

  return (
    <>
      {selectedShop[0] && (
        <ShopModalView
          setSelectedID={setSelectedID}
          setShopModal={setShopModal}
          onClose={handleShopModalClose}
          handleDiveShopBioChange={handleDiveShopBioChange}

          diveShop={selectedShop[0]}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={selectedShop[0].headerPictureUrl}
        />
      )}
    </>
  );
}
