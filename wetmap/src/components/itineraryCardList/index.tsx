import React from 'react';
import ItineraryCard from '../itineraryCard';
import { ItineraryItem } from '../../entities/itineraryItem';
import style from './style.module.scss';
import EmptyState from '../reusables/emptyState';
import ScreenData from '../newModals/screenData.json';

type ItineraryCardListProps = {
  itineraryList:         ItineraryItem[] | null
  canChangeItineraries?: boolean
};

export default function ItineraryCardList({ itineraryList, canChangeItineraries }: ItineraryCardListProps) {
  if (!itineraryList) {
    return null;
  }

  return         (
    <>
      <div className={style.itineraryList}>
        {itineraryList // in the future, if itineraryList is not empty, render a loading spinner
        && itineraryList.map((itinerary: any) => (
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
            canChangeItinerary={canChangeItineraries}
          />
        ))}
      </div>
      {itineraryList.length === 0 && (
        <EmptyState iconName="explore" text={ScreenData.DiveShop.emptyDrawer} />
      )}
    </>
  );
}
