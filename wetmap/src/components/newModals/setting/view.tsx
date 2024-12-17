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
          className="btn-lg text-gray"
          onClick={(e) => {
            if (props.onClose) {
              props.onClose(e);
            }
          }}
        />
        <h1 className="ml-10 mt-4 text-bold">{screenData.SettingsPage.header}</h1>
      </div>
    </>
  );
}
