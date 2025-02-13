import React, { useContext } from 'react';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ModalContext } from '../reusables/modal/context';
import { getDiveSitesByIDs } from '../../supabaseCalls/diveSiteSupabaseCalls';
import ItineraryCardView from './view';
import { ItineraryItem } from '../../entities/itineraryItem';
import { MapContext } from '../googleMap/mapContext';
import { insertItineraryRequest } from '../../supabaseCalls/itinerarySupabaseCalls';
import { toast } from 'react-toastify';
import screenData from '../newModals/screenData.json';

type ItineraryCardProps = {
  itinerary:           ItineraryItem
  canChangeItinerary?: boolean
};

export default function ItineraryCard({ itinerary, canChangeItinerary }: ItineraryCardProps) {
  const { setSitesArray } = useContext(SitesArrayContext);
  const { setMapConfig, mapRef } = useContext(MapContext);
  const { modalPause } = useContext(ModalContext);

  const flipMap = async (siteList: number[]) => {
    setSitesArray(siteList);

    const itinerizedDiveSites = await getDiveSitesByIDs(siteList);

    if (!itinerizedDiveSites || itinerizedDiveSites.length === 0) {
      console.error('No dive sites found or itinerizedDiveSites is undefined.');
      return; // Exit early if itinerizedDiveSites is undefined or empty
    }

    const bounds = new google.maps.LatLngBounds();
    itinerizedDiveSites.forEach((site) => {
      bounds.extend({ lat: site.lat, lng: site.lng });
    });

    mapRef?.fitBounds(bounds);
    setMapConfig(2);
    modalPause();
  };

  const handleDeleteButton = async (itinerary: ItineraryItem) => {
    const { error } = await insertItineraryRequest(itinerary, 'Delete');

    if (error) {
      toast.error(screenData.TripCard.deleteTripError);
    } else {
      toast.success(screenData.TripCard.deleteTripSuccess);
    }
  };

  return (
    <ItineraryCardView
      itinerary={itinerary}
      flipMap={flipMap}
      canChangeItinerary={canChangeItinerary}
      handleDeleteButton={handleDeleteButton}
    />
  );
}
