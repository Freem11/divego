import React from 'react';
import Itinerary from '../../itineraries/itinerary';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import style from './style.module.scss';
import screenData from '../screenData.json'
import defaultHeaderPicture from '../../../images/blackManta.png';
import { ItineraryItem } from './types';

type TripCreatorListViewProps = {
  setSelectedID:                (id: number) => void
  handleBackButton:             () => void

  itineraryList:    ItineraryItem[] | null
  selectedID:       number
  headerPictureUrl: string | null
};

export default function TripCreatorListView(props: TripCreatorListViewProps) {
  return (
    <div className="cols mx-0 full-height">
     
      <div className="col-12 panel border-none full-height">
        <WavyModalHeader image={props.headerPictureUrl || defaultHeaderPicture} onClose={props.handleBackButton}>
        </WavyModalHeader>
        <div className="panel-header">
          <h3>Trip Creator</h3>
          <div className={`${style.buttonAddDivingEvents}`}>
            <Button className="mt-2 btn-lg">
              Add new trip
            </Button>
          </div>
        </div>
        <div className={`${style.itineraryList}`}>
          {props?.itineraryList// in the future, if itineraryList is not empty, render a loading spinner
          && props?.itineraryList.map((itinerary) => {
            return (
              <Itinerary
                key={itinerary.id}
                itinerary={itinerary}
                setSelectedID={props?.setSelectedID}
                selectedID={props?.selectedID}
              />
            );
          })}
          {props?.itineraryList?.length === 0 && (
            <div>
              <p className="noSightings">
                {screenData.TripCreator.emptyDrawer}
              </p>
            </div>
          )}
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
