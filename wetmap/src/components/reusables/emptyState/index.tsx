import React from 'react';
import styles from './style.module.scss';
import Icon, { IconName } from '../../../icons/Icon';

type EmptyStateProps = {
  iconName: IconName
  text:     string
};

export default function EmptyState(props: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcons}>
        <Icon name={props.iconName} className={styles.emptyStateIconLeft} />
        <Icon name={props.iconName} className={styles.emptyStateIcon} />
        <Icon name={props.iconName} className={styles.emptyStateIconRight} />
      </div>
      <p>{props.text}</p>
    </div>
  );
}
