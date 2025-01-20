import React from 'react';
import style from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import { ItineraryItem } from '../../../entities/itineraryItem';

type TripCreatorViewProps = {
  setSelectedID:    (id: number) => void
  onClose?:         () => void
  itineraryList:    ItineraryItem[] | null
  selectedID:       number
  headerPictureUrl: string | null
};

export default function TripCreatorView(props: TripCreatorViewProps) {
  return (
    <div className="cols mx-0 full-height">
      <div className="col-12 panel border-none full-height">
        {/* <div className={style.buttonBack}> */}
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className={`btn-lg ${style.buttonBack}`}
          onClick={props.onClose}
        />
        <div className={style.header}>
          <h3>Trip Creator</h3>
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
