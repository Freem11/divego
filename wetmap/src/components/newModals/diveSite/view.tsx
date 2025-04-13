import React, { useRef } from 'react';
import screenData from '../screenData.json';
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
import ScreenData from '../screenData.json';
import SeaLifeImageCardList from '../../reusables/seaLifeCardList';

type DiveSiteViewProps = {
  showPicUploaderButton: boolean
  onClose?:              () => void
  openPicUploader:       () => void
  openDiveSiteFlag:      () => void
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

          {props.isPartnerAccount && (
            <div className={style.buttonImageUpload}>
              <Tooltip content={ScreenData.DiveSite.addPhotoTooltip}>
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
                <h1 className="mb-0">{props?.diveSite?.name}</h1>
                <div>
                  <Tooltip content={ScreenData.DiveSite.reportSiteTooltip}>
                    <Icon
                      name="error-outline"
                      className={style.reportIcon}
                      onClick={() => {
                        props.openDiveSiteFlag();
                      }}
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="d-flex">
                {'Added by: '}
                <a
                  href="#"
                  onClick={() =>
                    props.diveSite
                    && props.handleProfileSwitch(props.diveSite.userid)}
                >
                  {props?.diveSite?.newusername}
                </a>
              </div>
            </div>

            <div className="panel border-none">
              <div className="panel-body">
                <PlainTextInput
                  placeholder={`A little about ${props?.diveSite?.name}`}
                  value={props?.diveSite?.divesitebio || ''}
                  readOnly={!props?.isPartnerAccount}
                  onSave={props?.onDiveSiteBioChange}
                  tooltipEditText={`Click here to write a bio about ${props?.diveSite?.name}`}
                  tooltipConfirmText={`Click here to confirm changes to ${props?.diveSite?.name}'s bio`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-6 panel border-none full-height">
        <div className={style.panelHeader}>
          <h3>{screenData.DiveSite.drawerHeader}</h3>
          <div className={style.addPictureButton}>
            {props.showPicUploaderButton && (
              <Button className="btn-lg" onClick={props.openPicUploader}>
                <span className="hide-sm">
                  {screenData.DiveSite.addSightingButton}
                </span>
              </Button>
            )}
          </div>
        </div>
        <SeaLifeImageCardList diveSitePics={props.diveSitePics} />
      </div>
    </div>
  );
}
