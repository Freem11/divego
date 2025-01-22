import React, { useRef } from 'react';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import Button from '../../reusables/button';
import PlainTextInput from '../../reusables/plainTextInput';
import style from './style.module.scss';
import defaultHeaderPicture from '../../../images/blackManta.png';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import { ItineraryItem } from '../../../entities/itineraryItem';
import { DiveShop } from '../../../entities/diveShop';
import ItineraryCardList from '../../itineraryCardList';


type ShopModelViewProps = {
  onClose?:                     () => void
  handleDiveShopBioChange:      (newValue: string) => void
  handleDiveShopImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
  openTripCreatorList:          () => void
  handleInsertTest:             () => void
  handleSelectTest:             () => void

  diveShop:         DiveShop
  isPartnerAccount: boolean
  itineraryList:    ItineraryItem[]
  headerPictureUrl: string | null
  isMyShop:         boolean
};

export default function ShopModalView(props: ShopModelViewProps) {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  return (
    <div className="cols mx-0 full-height">
      <input
        ref={fileUploaderRef}
        className="d-hide"
        type="file"
        onChange={props.handleDiveShopImageSelection}
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
          {(props?.isPartnerAccount && props.isMyShop)
            ? (
                <div className={`${style.buttonAddDivingEvents}`}>
                  <h3>Trip Creator List</h3>
                  <Button className="mt-2 btn-lg" onClick={props.openTripCreatorList}>
                    Add diving event
                  </Button>
                </div>
              )
            : <h3>Offered Diving Trips</h3>}
          <Button className="mt-2 btn-lg" onClick={props.handleInsertTest}>
            Add test record
          </Button>
          <Button className="mt-2 btn-lg" onClick={props.handleSelectTest}>
            Retrieve your records
          </Button>
        </div>
        <ItineraryCardList itineraryList={props.itineraryList} canChangeItineraries={props?.isPartnerAccount && props.isMyShop} />
        <div className="panel-footer"></div>
      </div>
    </div>
  );
}
