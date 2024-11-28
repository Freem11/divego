import React, { useState, useContext, useEffect, useRef } from 'react';
import Itinerary from '../../itineraries/itinerary';
import { itineraries } from '../../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../../contexts/selectedShopContext';
import { CoordsContext } from '../../contexts/mapCoordsContext';
import { ZoomHelperContext } from '../../contexts/zoomHelperContext';
import './shopModal.css';
import { shops } from '../../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../../closeButton/closeButton';
import shopModalView from './view';
import ShopModalView from './view';

export default function ShopModal(props) {
  // const {lat, lng, setSelectedPhoto, setPhotoBoxModel } = props
  // const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  // const [siteCloseState, setSiteCloseState] = useState(false);
  // const [itineraryList, setItineraryList] = useState('');
  // const [selectedID, setSelectedID] = useState(null);
  // const { mapCoords, setMapCoords } = useContext(CoordsContext);
  // const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  // useEffect(() => {
  //   if (selectedShop[0]) {
  //     getItineraries(selectedShop[0].id);
  //     setMasterSwitch(true);
  //   }
  // }, [selectedShop]);

  // const getItineraries = async (IdNum) => {
  //   try {
  //     const itins = await itineraries(IdNum);
  //     if (itins.length > 0) {
  //       setItineraryList(itins);
  //     }
  //   }
  //   catch (e) {
  //     console.log({ title: 'Error', message: e.message });
  //   }
  // };

  // const handleShopModalClose = () => {
  //   setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
  //   setItineraryList('');
  // };

  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const [siteCloseState, setSiteCloseState] = useState(false);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);

  useEffect(() => {
    if (selectedShop) {
      getItineraries(selectedShop.id);
    }
  }, [selectedShop]);

  const getItineraries = async (IdNum) => {
    try {
      const itins = await itineraries(IdNum);
      if (itins.length > 0) {
        setItineraryList(itins);
      }
    } catch (e) {
      console.log({ title: 'Error', message: e.message });
    }
  };

  const handleShopModalClose = () => {
    setSelectedShop({ ...selectedShop, id: 0, orgname: '' });
    setItineraryList('');
  };
  const fileUploaderRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {selectedShop && (
        <ShopModalView shopModelName={selectedShop.orgname} shopDescription="test" />
      )}
    </>
  );
}
