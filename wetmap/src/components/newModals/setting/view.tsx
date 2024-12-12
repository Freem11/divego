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
      {/* <ModalHeader title="Settings" onClose={props.onClose} /> */}
      <div className="flex-column-between full-height mx-6 mb-6">
        <div className="flex-column-between full-height">
          <div className={styles.buttonBack}>
            <ButtonIcon
              icon={<Icon name="chevron-left" fill="gray" />}
              className="btn-lg"
              onClick={(e) => {
                if (props.onClose) {
                  props.onClose(e);
                }
              }}
            />
          </div>
          <div className={styles.twoRow}>
            <div>
              <div className="d-flex mx-3">
                <h1 className="text-clip text-bold">{' '}</h1>
              </div>
            </div>
            <div>
              <div className="d-flex mx-3">
                <h1 className="text-clip text-bold">{screenData.SettingsPage.header}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
