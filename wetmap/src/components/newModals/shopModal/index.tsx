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
    if (selectedShop) {
      getItineraries(selectedShop.id);
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
      setMapCoords([selectedShop.lat, selectedShop.lng]);
    }
  }, [shopModal]);

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

  const handleShopModalClose = () => {
    setSelectedShop({ ...selectedShop, id: 0, orgname: '' });
    setItineraryList([]);
    setShopModal(false);
  };

  const handleDiveShopBioChange = async (newValue: string) => {
    if (selectedShop) {
      await updateDiveShop({ id: selectedShop.id, bio: newValue, photo: selectedShop.diveShopProfilePhoto });
    }
  };

  // console.log('selectedShop:', selectedShop);

  return (
    <>
      {selectedShop && (
        <ShopModalView
          setSelectedID={setSelectedID}
          setShopModal={setShopModal}
          onClose={handleShopModalClose}
          handleDiveShopBioChange={handleDiveShopBioChange}
          handleDiveShopImageSelection={() => {}}

          diveShop={selectedShop}
          isPartnerAccount={isPartnerAccount}
          itineraryList={itineraryList}
          selectedID={selectedID}
          headerPictureUrl={selectedShop.headerPictureUrl}
        />
      )}
    </>
  );
}
