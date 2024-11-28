import React, { useState, useContext, useEffect } from 'react';
import Itinerary from '../itineraries/itinerary';
import { itineraries } from '../../supabaseCalls/itinerarySupabaseCalls';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import './shopModal.css';
import { shops } from '../../supabaseCalls/shopsSupabaseCalls';
import CloseButton from '../closeButton/closeButton';

export default function ShopModal(props) {
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const [itineraryList, setItineraryList] = useState('');
  const [selectedID, setSelectedID] = useState(null);

  useEffect(() => {
    if (selectedShop[0]) {
      getItineraries(selectedShop[0].id);
    }
  }, [selectedShop]);

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
    setSelectedShop({ ...selectedShop, id: 0, orgName: '' });
    setItineraryList('');
  };

  return (
    <div
      style={{
        height:   '98%',
        // backgroundColor: "orange",
        overflow: 'hidden',
      }}
    >
      <div className="titleAlt">
        <div>
          <h3 className="headerAlt">
            {selectedShop[0] && selectedShop[0].orgName}
          </h3>
        </div>
        <CloseButton onClick={handleShopModalClose} />
      </div>

      <div style={{ marginTop: '3%', width: '100%', borderRadius: 15 }}>
        <div className="container5">
          {itineraryList
          && itineraryList.map((itinerary) => {
            return (
              <Itinerary
                key={itinerary.id}
                itinerary={itinerary}
                setSelectedID={setSelectedID}
                selectedID={selectedID}
              />
            );
          })}
          {itineraryList.length === 0 && (
            <div>
              <p className="noSightings">
                No Trips are currently being offered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
