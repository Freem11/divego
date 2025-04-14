import React, { useRef } from 'react';
import style from './style.module.scss';
import Button from '../../reusables/button';
import Icon from '../../../icons/Icon';
import defaultHeaderPicture from '../../../images/blackManta.png';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import { PhotosGroupedByDate } from '../../../entities/photos';
import PlainTextInput from '../../reusables/plainTextInput';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import ButtonIcon from '../../reusables/buttonIcon';
import Tooltip from '../../reusables/tooltip';
import SeaLifeImageCardList from '../../reusables/seaLifeCardList';
import { useTranslation } from 'react-i18next';

type DiveSiteViewProps = {
  showPicUploaderButton: boolean
  onClose?:              () => void
  openPicUploader:       () => void
  handleImageSelection:  (event: React.ChangeEvent<HTMLInputElement>) => void
  handleProfileSwitch:   (username: string) => Promise<void>
  onDiveSiteBioChange:   (newValue: string) => void
  diveSite:              DiveSiteWithUserName | null
  diveSitePics:          PhotosGroupedByDate[] | null
  isPartnerAccount:      boolean
  headerPictureUrl:      string | null
};


export default function DiveSiteView(props: DiveSiteViewProps) {
  const fileUploaderRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  return (
    <div className="cols mx-0 full-height">
      <input
        ref={fileUploaderRef}
        className="d-hide"
        type="file"
        onChange={props.handleImageSelection}
      />

      <div className="col-6">
        <WavyModalHeader
          image={props.headerPictureUrl || defaultHeaderPicture}
          onClose={props.onClose}
        >
          <div className={style.buttonOpenPictureUpload}></div>

          {props.isPartnerAccount
          && (
            <div className={style.buttonImageUpload}>
              <Tooltip content={t('DiveSite.addPhotoTooltip')}>
                <ButtonIcon
                  icon={<Icon name="camera-plus" />}
                  className="btn-lg"
                  onClick={() => fileUploaderRef?.current?.click?.()}
                />
              </Tooltip>
            </div>
          )}

        </WavyModalHeader>

        <div className="ml-6">
          <div className="stack-4">
            <div>
              <div className="d-flex">
                <h1 className="mb-0">
                  {props?.diveSite?.name}
                </h1>
                <div>
                  <Tooltip content={t('DiveSite.reportSiteTooltip')}>
                    <Icon
                      name="error-outline"
                      className={style.reportIcon}
                      onClick={() =>
                        (window.location.href = `mailto:scubaseasons@gmail.com?subject=Reporting%20issue%20with%20Dive%20Site:%20"${props.diveSite?.name}"%20at%20Latitude:%20${props.diveSite?.lat}%20Longitude:%20${props.diveSite?.lng}&body=Type%20of%20issue:%0D%0A%0D%0A%0D%0A%0D%0A1)%20Dive%20site%20name%20not%20correct%0D%0A%0D%0A(Please%20provide%20correct%20dive%20site%20name%20and%20we%20will%20correct%20the%20record)%0D%0A%0D%0A%0D%0A%0D%0A2)%20Dive%20site%20GPS%20coordinates%20are%20not%20correct%0D%0A%0D%0A(Please%20provide%20a%20correct%20latitude%20and%20longitude%20and%20we%20will%20update%20the%20record)`)}
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="d-flex">
                {'Added by: '}
                <a
                  href="#"
                  onClick={() => props.diveSite && props.handleProfileSwitch(props.diveSite.userid)}
                >
                  {props?.diveSite?.newusername}
                </a>
              </div>
            </div>


            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  placeholder={t('DiveSite.bioInputPlaceholder', { name: props?.diveSite?.name })}
                  value={props?.diveSite?.divesitebio || ''}
                  readOnly={!props?.isPartnerAccount}
                  onSave={props?.onDiveSiteBioChange}
                  tooltipEditText={t('DiveSite.bioTooltipEdit', { name: props?.diveSite?.name })}
                  tooltipConfirmText={t('DiveSite.bioTooltipConfirm', { name: props?.diveSite?.name })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 panel border-none full-height">
        <div className={style.panelHeader}>
          <h3>{t('DiveSite.drawerHeader')}</h3>
          <div className={style.addPictureButton}>
            {props.showPicUploaderButton
            && (
              <Button className="btn-lg" onClick={props.openPicUploader}>
                <span className="hide-sm">
                  {t('DiveSite.addSightingButton')}
                </span>
              </Button>
            ) }

          </div>
        </div>
        <SeaLifeImageCardList diveSitePics={props.diveSitePics} />
      </div>
    </div>
  );
}
