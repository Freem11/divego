import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import WavyModalHeader from '../../reusables/wavyModalHeader';
import defaultHeaderPicture from '../../../images/blackManta.png';
import Tooltip from '../../reusables/tooltip';

type SettingsProps = {
  onClose:             () => void
  handleLogout:        () => Promise<void>
  profileType:         string | null
  handlePartnerButton: () => void
  handleDanger:        () => void
  setOpenDialog:       (value: React.SetStateAction<boolean>) => void
  openDialog:          boolean
};

export default function SettingsView(props: SettingsProps) {
  return (
    <div className="full-height pb-4">
      <div className="flex-column-between full-height mb-6">
        <WavyModalHeader image={defaultHeaderPicture} onClose={props.onClose}>
          <div className={styles.buttonImageUpload}>
            <Tooltip content={screenData.SettingsPage.addPhotoButton} direction="left">
              <ButtonIcon
                icon={<Icon name="camera-plus" />}
                className="btn-lg mr-0 ml-auto"
                // onClick={// TODO: Allow user profile picture uploads}
              />
            </Tooltip>
          </div>
        </WavyModalHeader>
        <div className="mx-10 text-left">
          <h1 className="text-bold">{screenData.SettingsPage.header}</h1>
          <h2 className="ml-4 mt-2 mb-1">{screenData.SettingsPage.subHeading1}</h2>
          <div className={styles.grayOutline}>
            <h4 className="ml-8 mb-0 my-1 text-bold text-dark">{props.profileType}</h4>
            { props.profileType === 'Diver Account'
            && (
              <span onClick={props.handlePartnerButton}>
                <p className={styles.upgradeLink}>{screenData.SettingsPage.notPartnerAccount}</p>
              </span>
            )}
            { props.profileType === null
            && (
              <span>
                <p className="ml-10 mb-1 p-0 text-bold text-primary ">Unknown profile Type</p>
              </span>
            )}
          </div>

          <div className={styles.horizontalButtonContainer}>
            <div className="col-3"></div>
            <div className="col-3">
              <Button
                onClick={props.handleLogout}
                className="btn-md bg-primary"
                iconRight={<Icon name="chevron-right" />}
                type="button"
              >
                {screenData.SettingsPage.logout}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 mx-10">
          <h2 className="my-2 text-center" style={{ color: 'maroon' }}>{screenData.SettingsPage.dangerZoneBar}</h2>
          <div className={styles.redOutline} onClick={props.handleDanger}>
            <h4 className="my-4 text-bold text-center" style={{ color: 'maroon' }}>{screenData.SettingsPage.delAccount}</h4>
          </div>
        </div>
      </div>
    </div>

  );
}
