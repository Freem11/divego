import React from 'react';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import { ItineraryItem } from '../../../entities/itineraryItem';
import ItineraryCardList from '../../itineraryCardList';

type TripCreatorListViewProps = {
  onClose?:         () => void
  itineraryList:    ItineraryItem[] | null
  openTripCreator:  () => void
  headerPictureUrl: string | null
};

export default function TripCreatorListView(props: TripCreatorListViewProps) {
  return (
    <div className="cols mx-0 full-height">

      <div className="col-12 panel border-none full-height">
        <WavyModalHeader image={props.headerPictureUrl || defaultHeaderPicture} onClose={props.onClose}>
        </WavyModalHeader>
        <div className="panel-header">
          <h3>Trip Creator</h3>
          <div className={`${style.buttonAddDivingEvents}`}>
            <Button className="mt-2 btn-lg" onClick={props.openTripCreator}>
              Add new trip
            </Button>
          </div>
        </div>
        <ItineraryCardList itineraryList={props.itineraryList} canChangeItineraries={true} />
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
