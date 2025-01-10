import React, { useState, useContext, useEffect } from 'react';
import { useSpring } from 'react-spring';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { MapConfigContext } from '../contexts/mapConfigContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { ModalContext } from '../reusables/modal/context';
import { getDiveSitesByIDs } from '../../supabaseCalls/diveSiteSupabaseCalls';
import ItineraryCardView from './view';
import { ItineraryItem } from '../../entities/itineraryItem';

type ItineraryCardProps = {
  itinerary:       ItineraryItem
  selectedCard:    number
  setSelectedCard: (id: number) => void
};

export default function ItineraryCard({ itinerary, selectedCard, setSelectedCard }: ItineraryCardProps) {
  const { setSitesArray } = useContext(SitesArrayContext);
  const { setMapCoords } = useContext(CoordsContext);
  const { setMapZoom } = useContext(ZoomContext);
  const { setMapConfig } = useContext(MapConfigContext);
  const modalContext = useContext(ModalContext);

  const [hiddenHeigth, setHiddenHeigth] = useState(0);

  const heightChange = useSpring({
    from: { height: 0 },
    to:   { height: hiddenHeigth },
  });

  useEffect(() => {
    if (selectedCard !== itinerary.id) {
      releaseMoreInfoAnimations();
    }
  }, [selectedCard]);

  const startMoreInfoAnimation = (id: number) => {
    setSelectedCard(id);

    if (hiddenHeigth === 0) {
      setHiddenHeigth(150);
    } else {
      setHiddenHeigth(0);
    }
  };

  const releaseMoreInfoAnimations = () => {
    setHiddenHeigth(0);
  };

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

    setMapZoom(12);
    setMapConfig(2);
    setMapCoords([moveLat, moveLng]);

    modalContext.modalCancel();
  };

  return (
    <ItineraryCardView
      itinerary={itinerary}
      flipMap={flipMap}
      startMoreInfoAnimation={startMoreInfoAnimation}
      heightChange={heightChange}
    />
  );
}
