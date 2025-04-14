import React from 'react';
import ItineraryCard from '../itineraryCard';
import { ItineraryItem } from '../../entities/itineraryItem';
import style from './style.module.scss';
import EmptyState from '../reusables/emptyState';
import { useTranslation } from 'react-i18next';

type ItineraryCardListProps = {
  itineraryList:         ItineraryItem[] | null
  canChangeItineraries?: boolean
};

export default function ItineraryCardList({ itineraryList, canChangeItineraries }: ItineraryCardListProps) {
  if (!itineraryList) {
    return null;
  }

  const { t } = useTranslation();

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
        <EmptyState iconName="explore" text={t('DiveShop.emptyDrawer')} />
      )}
    </>
  );
}
