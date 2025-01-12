import React from 'react';
import style from './style.module.scss';
import ButtonIcon from '../reusables/buttonIcon';
import Icon from '../../icons/Icon';
import { animated, SpringValue } from 'react-spring';
import { ItineraryItem } from '../../entities/itineraryItem';

type TripCardViewProps = {
  itinerary:              ItineraryItem
  flipMap:                (siteList: number[]) => Promise<void>
  canChangeItinerary?:    boolean
  startMoreInfoAnimation: (id: number) => void
  heightChange:           { height: SpringValue<number> }
};

export default function ItineraryCardView({ itinerary, flipMap, canChangeItinerary, startMoreInfoAnimation, heightChange }: TripCardViewProps) {
  return (
    <div className={style.masterBox} key={itinerary.id}>
      <div className={style.shadowbox}>
        <div className={style.moreBox}>
          <p className={style.tripName}>{itinerary.tripName}</p>
          <p
            className={style.opener}
            onClick={() => startMoreInfoAnimation(itinerary.id)}
          >
            More Info
          </p>
        </div>
        {canChangeItinerary
          ? (
              <div className={style.buttonBox}>
                <ButtonIcon
                  icon={<Icon name="pencil" />}
                  className={`btn-lg ${style.buttonStyling}`}
                  title="Edit trip"
                  // onClick={}
                />
                <ButtonIcon
                  icon={<Icon name="trash" />}
                  className={`btn-lg ${style.buttonStyling}`}
                  title="Delete trip"
                  // onClick={}
                />
              </div>
            )
          : (
              <div className={style.buttonBox}>
                <ButtonIcon
                  icon={<Icon name="anchor" />}
                  className={`btn-lg ${style.buttonStyling}`}
                  title="Visit dive sites"
                  onClick={() => flipMap(itinerary.siteList)}
                />
                <ButtonIcon
                  icon={<Icon name="diving-scuba-flag" />}
                  className={`btn-lg ${style.buttonStyling}`}
                  title="Book trip"
                  // onClick={}
                />
              </div>
            )}
      </div>
      <animated.div className={style.extraBox} style={heightChange}>
        <div className={style.topRail}>
          <p className={style.dateText}>
            {itinerary.startDate}
            {' to '}
            {itinerary.endDate}
          </p>
          <p className={style.priceText}>{itinerary.price }</p>
        </div>

        <p className={style.lowerText}>{itinerary.description}</p>
      </animated.div>
    </div>
  );
}
