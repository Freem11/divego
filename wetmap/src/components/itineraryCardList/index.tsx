import React, { useState } from 'react';
import ItineraryCard from '../itineraryCard';
import { ItineraryItem } from '../../entities/itineraryItem';
import style from './style.module.scss';

type ItineraryCardListProps = {
  itineraryList: ItineraryItem[]
};

export default function ItineraryCardList({ itineraryList }: ItineraryCardListProps) {
  const [selectedCard, setSelectedCard] = useState<number>(0);
  return         (
    <div className={style.itineraryList}>
      {itineraryList // in the future, if itineraryList is not empty, render a loading spinner
      && itineraryList.map((itinerary: any) => {
        return (
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        );
      })}
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
