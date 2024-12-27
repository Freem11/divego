import screenData from '../screenData.json';
import React from 'react';
import styles from './style.module.scss';
import ButtonIcon from '../../reusables/buttonIcon';
import Icon from '../../../icons/Icon';

type SettingsProps = {
  onClose:      () => void
};

export default function SettingsView(props: SettingsProps) {
  return (
    <>
      <div className={styles.buttonBack}>
        <ButtonIcon
          icon={<Icon name="chevron-left" />}
          className="btn-lg text-gray ml-4 mt-4"
          onClick={props.onClose}
        />
      </div>
      <div className="mx-10 text-left">
        <h1 className="mt-4 text-bold">{screenData.SettingsPage.header}</h1>
      </div>
    </>
  );
}
