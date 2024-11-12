import React, { useState, useContext, useEffect, useRef } from 'react';
import Itinerary from '../../itineraries/itinerary';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { ShopModalContext } from '../../contexts/shopModalContext';
import { MasterContext } from '../../contexts/masterContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import { shops } from '../../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../../closeButton/closeButton';
import shopModalView from './view';
import ShopModalView from './view';

export default function ShopModal(props) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  // const { shopModal, setShopModal } = useContext(ShopModalContext);
  // const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  // const [siteCloseState, setSiteCloseState] = useState(false);
  // const [itineraryList, setItineraryList] = useState('');
  // const [selectedID, setSelectedID] = useState(null);
  // const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  // const { mapCoords, setMapCoords } = useContext(CoordsContext);
  // const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);


  const { shopModal, setShopModal } = useContext(ShopModalContext);
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);
  const { masterSwitch, setMasterSwitch } = useContext(MasterContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  useEffect(() => {
    if (selectedShop[0]) {
      getItineraries(selectedShop[0].id);
      setMasterSwitch(true);
    }
  }, [selectedShop]);

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
    // setShopModal(false);
  };
  // const fileUploaderRef = useRef<HTMLInputElement>(null);

  return (
    <>
    {selectedShop[0] && (
      <ShopModalView 
        onClose={handleShopModalClose} 
        diveShop={selectedShop[0]}
        // shopModelName={selectedShop[0].orgName} 
        // shopDescription="test"/>
      />
    )}
    </>
  );
}