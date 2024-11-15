import React, { useState, useContext, useEffect, useRef } from 'react';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ShopModalContext } from '../../contexts/shopModalContext';
import { MasterContext } from '../../contexts/masterContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import { UserProfileContext } from '../../contexts/userProfileContext';
import ShopModalView from './view';

export default function ShopModal(props) {
  
  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { profile } = useContext(UserProfileContext);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  const [isPartnerAccount, setIsPartnerAccount] = useState(false);
  const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);

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

  const getItineraries = async (IdNum) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins.length > 0) {
        setItineraryList(itins);
      }
    }
    catch (e) {
      console.log({ title: 'Error', message: e.message });
    }
  };

  const handleShopModalClose = () => {
    props.onModalCancel();
    setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
    setItineraryList('');
  };

  return (
    <>
    {selectedShop[0] && (
      <ShopModalView 
        setSelectedID={setSelectedID}
        setShopModal={setShopModal}
        onClose={handleShopModalClose} 
        onDiveShopBioChange={(newValue: string) => console.log("This is a placeholder for future logic. " + newValue)}

        diveShop={selectedShop[0]}
        isPartnerAccount={isPartnerAccount}
        itineraryList={itineraryList}
        selectedID={selectedID}
      />
    )}
    </>
  );
}