import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';
import SliderInput from '../../reusables/sliderInput';
import VisibilitySliderInput from '../../reusables/visibilitySliderInput';

type SettingsProps = {
  onClose:             () => void
  handleLogout:        () => Promise<void>
  profileType:         string | null
  handlePartnerButton: () => void
  handleDanger:        () => void
  metrics:             boolean
  switchToMetrics:     (metrics: boolean) => void
};

export default function SettingsView(props: SettingsProps) {
  const [isChecked, setIsChecked] = React.useState<boolean>(props.metrics);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    props.switchToMetrics(!isChecked);
  };

  return (
    <div className="full-height" style={{ paddingBottom: '4.5rem' }}>
      <ButtonIcon
        icon={<Icon name="chevron-left" />}
        className={`btn-lg text-gray ml-4 mt-4 ${styles.buttonBack}`}
        onClick={props.onClose}
      />

      <div className="flex-column-between full-height mb-6">
        <div className="mx-10 text-left">
          <h1 className="mt-4 text-bold">{screenData.SettingsPage.header}</h1>
          <h2 className="ml-4 mt-2 mb-1">{screenData.SettingsPage.subHeading1}</h2>
          <div className={styles.grayOutline}>
            <h4 className="ml-8 mb-0 mt-1 text-bold text-dark">{props.profileType}</h4>
            { props.profileType === 'Diver Account'
            && (
              <span onClick={props.handlePartnerButton}>
                <p className={styles.upgradeLink}>{screenData.SettingsPage.notPartnerAccount}</p>
              </span>
            )}
            { props.profileType === null
            && (
              <span>
                <p className="ml-10 mb-1 p-0 text-bold text-primary ">Unknown account type</p>
              </span>
            )}
          </div>


          <div>
            <h2 className="ml-4 mt-2 mb-1">Unit System</h2>
            <div className={styles.grayOutlineFlexRow}>
              <h4 className="ml-8 mb-0 mt-1 text-bold text-dark">{props.metrics ? 'Metric' : 'Imperial'}</h4>
              <div className={styles.toggleSwitch}>
                <input
                  checked={isChecked}
                  onClick={handleToggle}
                  type="checkbox"
                  name="metric"
                  className={styles.toggleSwitchCheckbox}
                />
                <label className={styles.toggleSwitchLabel}  onClick={handleToggle}>
                  <span className={styles.toggleSwitchInner} />
                  <span className={styles.toggleSwitchSwitch} />
                </label>
              </div>
            </div>
          </div>


          <div>

            <SliderInput
              min={0}
              max={2.5}
              range={2.5 / 25}
              value={1}
              unit="m/s"
              showLabel={true}
            />

          </div>
          <div>
            <VisibilitySliderInput />
          </div>

          <div className={styles.horizontalButtonContainer}>
            <div className="col-3"></div>
            <div className="col-3">
              <Button
                onClick={props.handleLogout}
                className="btn-md btn-primary"
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
