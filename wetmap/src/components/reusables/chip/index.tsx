import React from 'react';
import styles from './style.module.scss';
import Icon from '../../../icons/Icon';

type ChipProps = {
  children: React.ReactNode
  unselect: () => void
};

export default function  Chip({ children, unselect }: ChipProps) {
  return (
    <div className={styles.chip} onClick={unselect}>
      <span>
        {children}
      </span>
      <Icon className={styles.icon} name="close" />
    </div>
  );
}
