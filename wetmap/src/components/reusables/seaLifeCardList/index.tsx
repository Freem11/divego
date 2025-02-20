import React from 'react';
import style from './style.module.scss';
import { PhotosGroupedByDate } from '../../../entities/photos';
import readableDate from '../../../helpers/readableDate';
import SeaLifeCard from '../seaLifeCard';
import Icon from '../../../icons/Icon';
import EmptyState from '../emptyState';
import ScreenData from '../../newModals/screenData.json';

type SeaLifeImageCardListProps = {
  diveSitePics:   PhotosGroupedByDate[] | null
  onUserProfile?: boolean
};

export default function SeaLifeImageCardList(props: SeaLifeImageCardListProps) {
  return (
    <>
      <div className={style.cardList}>
        {props.diveSitePics && props.diveSitePics.map((packet, index) => (
          <div key={index} className={style.packet}>
            <div className={style.packetHeader}>
              {props.onUserProfile && (
                <div className={style.packetHeaderItem}>
                  <Icon name="anchor" />
                  <span>{packet.name}</span>
                </div>
              )}
              <div className={style.packetHeaderItem}>
                <Icon name="calendar-month" />
                <span>
                  {readableDate(packet.dateTaken)}
                </span>
              </div>
            </div>
            {packet.photos && packet.photos.map(pic => (
              <SeaLifeCard key={pic.id} pic={pic} isShowAuthor={!props.onUserProfile} />
            ))}
          </div>
        ))}
      </div>
      {(!props.diveSitePics || props.diveSitePics.length === 0) && (
        <EmptyState
          iconName="shark"
          text={props.onUserProfile ? ScreenData.UserProfile.emptyDrawer : ScreenData.DiveSite.emptyDrawer}
        />
      )}
    </>
  );
}
