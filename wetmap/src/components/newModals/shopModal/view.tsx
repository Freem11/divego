import React, { useRef } from 'react';
import Itinerary from '../../itineraries/itinerary';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import PlainTextInput from '../../reusables/plainTextInput';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import { ItineraryItem } from './types';
import { DiveShop } from '../../../entities/diveShop';


type ShopModelViewProps = {
  setSelectedID:                (id: number) => void
  onClose?:                     () => void
  handleImageSelection:         (event: React.ChangeEvent<HTMLInputElement>) => void
  handleDiveShopBioChange:      (newValue: string) => void
  diveShop:                     DiveShop | null
  isPartnerAccount:             boolean
  itineraryList:                ItineraryItem[] | null
  selectedID:                   number
  headerPictureUrl:             string | null
  isMyShop:                     boolean
};

export default function ShopModalView(props: ShopModelViewProps) {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div className="cols mx-0 full-height">
      <input
        ref={fileUploaderRef}
        className="d-hide"
        type="file"
        onChange={props.handleImageSelection}
      />
      <div className="col-6">
        <WavyModalHeader image={props.headerPictureUrl || defaultHeaderPicture} onClose={props.onClose}>
          <div className={style.buttonImageUpload}>
            {(props?.isPartnerAccount && props.isMyShop) && (
              <ButtonIcon
                icon={<Icon name="camera-plus" />}
                className="btn-lg"
                onClick={() => fileUploaderRef?.current?.click?.()}
              />
            )}
          </div>
        </WavyModalHeader>
        <div className="ml-6">
          <div className="stack-4">
            <div>
              <div className="d-flex">
                <h1 className="mb-0">{props?.diveShop?.orgname}</h1>
              </div>
            </div>

            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  placeholder={`A little about ${props?.diveShop?.orgname}`}
                  value={props?.diveShop?.diveshopbio || ''}
                  readOnly={!props?.isPartnerAccount || !props.isMyShop}
                  onSave={props?.handleDiveShopBioChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 panel border-none full-height">
        <div className="panel-header">
          <h3>Offered Diving Trips</h3>
          {(props?.isPartnerAccount && props.isMyShop) && (
            <div className={`${style.buttonAddDivingEvents}`}>
              <Button className="mt-2 btn-lg">
                Add diving event
              </Button>
            </div>
          )}
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
                No Trips are currently being offered.
              </p>
            </div>
          )}
        </div>
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
