import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';
import Button from '../../reusables/button';

type SettingsProps = {
  onClose:      () => void
  handleLogout: () => Promise<void>
};

export default function SettingsView(props: SettingsProps) {
  return (
    <>
      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className="btn-lg text-gray ml-4 mt-4"
          onClick={(e) => {
            if (props.onClose) {
              props.onClose(e);
            }
          }}
        />
        <h1 className="ml-10 mt-4 text-left text-bold">{screenData.SettingsPage.header}</h1>
      </div>
      <div className="ml-10">
        <h2 className="ml-4 mt-2 text-left">{screenData.SettingsPage.subHeading1}</h2>
      </div>
      <div className={styles.outline}>
        <h4 className="ml-8 mb-0 text-left text-bold text-dark">Diver Account</h4>
        <p className="ml-10 mb-1 p-0 text-left text-bold text-primary">{screenData.SettingsPage.notPartnerAccount}</p>
      </div>
      <div className="mt-6 col-3">
        <Button
          onClick={props.handleLogout}
          className="btn-md bg-primary text-right"
          type="button"
        >
          {screenData.SettingsPage.logout}
        </Button>
      </div>

    </>
  );
}
