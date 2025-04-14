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
import Tooltip from '../../reusables/tooltip';
import { useTranslation } from 'react-i18next';

type ShopModelViewProps = {
  onClose?:                     () => void
  handleDiveShopBioChange:      (newValue: string) => void
  handleDiveShopImageSelection: (event: React.ChangeEvent<HTMLInputElement>) => void
  openTripCreatorList:          () => void
  diveShop:                     DiveShop | null
  isPartnerAccount:             boolean
  itineraryList:                ItineraryItem[] | null
  headerPictureUrl:             string | null
  isMyShop:                     boolean
};

export default function ShopModalView(props: ShopModelViewProps) {
  const { t } = useTranslation();

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
              <Tooltip content={t('DiveShop.addDiveShopPhotoButton')}>
                <ButtonIcon
                  icon={<Icon name="camera-plus" />}
                  className="btn-lg"
                  onClick={() => fileUploaderRef?.current?.click?.()}
                />
              </Tooltip>
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
                  placeholder={t('DiveShop.bioInputPlaceholder', { name: props?.diveShop?.orgname })}
                  value={props?.diveShop?.diveshopbio || ''}
                  readOnly={!props?.isPartnerAccount || !props.isMyShop}
                  onSave={props?.handleDiveShopBioChange}
                  tooltipEditText={t('DiveShop.bioTooltipEdit', { name: props?.diveShop?.orgname })}
                  tooltipConfirmText={t('DiveShop.bioTooltipConfirm', { name: props?.diveShop?.orgname })}
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
                    {t('DiveShop.addEvent')}
                  </Button>
                </div>
              )
            : <h3>{t('DiveShop.offeredTips')}</h3>}
        </div>
        <ItineraryCardList itineraryList={props.itineraryList} canChangeItineraries={props?.isPartnerAccount && props.isMyShop} />
      </div>
    </div>
  );
}
