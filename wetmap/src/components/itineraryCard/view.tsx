import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import ButtonIcon from '../reusables/buttonIcon';
import Icon from '../../icons/Icon';
import { ItineraryItem } from '../../entities/itineraryItem';
import { format } from 'date-fns';

type TripCardViewProps = {
  itinerary:           ItineraryItem
  flipMap:             (siteList: number[]) => Promise<void>
  canChangeItinerary?: boolean
};

export default function ItineraryCardView({ itinerary, flipMap, canChangeItinerary }: TripCardViewProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      // Check if the text overflows the container
      const isTextOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverflowing(isTextOverflowing);
    }
  }, [itinerary.description]);

  return (
    <div className={style.card}>
      <div className={style.cardTop}>
        <div className={style.mainContent}>
          <p className={style.title}>{itinerary.tripName}</p>
          <div className={style.info}>
            <p>
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day:   'numeric',
                year:  'numeric',
              }).format(new Date(itinerary.startDate))}
              {' - '}
              {new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day:   'numeric',
                year:  'numeric',
              }).format(new Date(itinerary.endDate))}
            </p>
            <span>|</span>
            <p>{itinerary.price }</p>
          </div>
        </div>

        <div className={style.actions}>
          {canChangeItinerary
            ? (
                <>
                  <ButtonIcon
                    icon={<Icon name="pencil" />}
                    className={style.actionIcon}
                    // onClick={}
                  />
                  <ButtonIcon
                    icon={<Icon name="trash" />}
                    className={style.actionIcon}
                    // onClick={}
                  />
                </>
              )
            : (
                <>
                  <ButtonIcon
                    icon={<Icon name="anchor" />}
                    className={style.actionIcon}
                    onClick={() => flipMap(itinerary.siteList)}
                  />
                  <ButtonIcon
                    icon={<Icon name="diving-scuba-flag" />}
                    className={style.actionIcon}
                    // onClick={}
                  />
                </>
              )}
        </div>
      </div>

      <div className={style.description}>
        <p
          ref={textRef}
          className={`${style.text} ${isExpanded ? style.expanded : style.collapsed}`}
        >
          {itinerary.description}
        </p>
        {isOverflowing && (
          <span
            className={style.showMore}
            onClick={() => setIsExpanded(prev => !prev)}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </span>
        )}
      </div>
    </div>
  );
}
