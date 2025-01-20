import React, { useContext } from 'react';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ModalContext } from '../reusables/modal/context';
import { getDiveSitesByIDs } from '../../supabaseCalls/diveSiteSupabaseCalls';
import ItineraryCardView from './view';
import { ItineraryItem } from '../../entities/itineraryItem';
import { MapContext } from '../googleMap/mapContext';

type ItineraryCardProps = {
  itinerary:           ItineraryItem
  canChangeItinerary?: boolean
};

export default function ItineraryCard({ itinerary, canChangeItinerary }: ItineraryCardProps) {
  const { setSitesArray } = useContext(SitesArrayContext);
  const { setMapConfig, mapRef } = useContext(MapContext);
  const modalContext = useContext(ModalContext);

  const flipMap = async (siteList: number[]) => {
    setSitesArray(siteList);

    const itinerizedDiveSites = await getDiveSitesByIDs(JSON.stringify(siteList));

    if (!itinerizedDiveSites || itinerizedDiveSites.length === 0) {
      console.error('No dive sites found or itinerizedDiveSites is undefined.');
      return; // Exit early if itinerizedDiveSites is undefined or empty
    }

    const lats: number[] = [];
    const lngs: number[] = [];

    itinerizedDiveSites.forEach((site) => {
      lats.push(site.lat);
      lngs.push(site.lng);
    });

    const moveLat = lats.reduce((acc, curr) => acc + curr, 0) / lats.length;
    const moveLng = lngs.reduce((acc, curr) => acc + curr, 0) / lngs.length;

    mapRef?.panTo({ lat: moveLat, lng: moveLng });
    mapRef?.setZoom(12);
    setMapConfig(2);

    modalContext.modalCancel();
  };

  return (
    <ItineraryCardView
      itinerary={itinerary}
      flipMap={flipMap}
      canChangeItinerary={canChangeItinerary}
    />
  );
}
