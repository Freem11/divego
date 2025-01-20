import React from 'react';
import ItineraryCard from '../itineraryCard';
import { ItineraryItem } from '../../entities/itineraryItem';
import style from './style.module.scss';

type ItineraryCardListProps = {
  itineraryList:         ItineraryItem[] | null
  canChangeItineraries?: boolean
};

export default function ItineraryCardList({ itineraryList, canChangeItineraries }: ItineraryCardListProps) {
  if (!itineraryList) {
    return null;
  }

  return         (
    <div className={style.itineraryList}>
      {itineraryList // in the future, if itineraryList is not empty, render a loading spinner
      && itineraryList.map((itinerary: any) => (
        <ItineraryCard
          key={itinerary.id}
          itinerary={itinerary}
          canChangeItinerary={canChangeItineraries}
        />
      ))}
      {itineraryList.length === 0 && (
        <div>
          <p>
            No dive trips yet.
          </p>
        </div>
      )}
    </div>
  );
}
