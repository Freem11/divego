import React from 'react';
import styles from './style.module.scss';

type EmptyStateProps = {
  visual:   React.ReactNode
  text:     string
  onClick?: () => void
};

export default function EmptyState({ visual, text, onClick }: EmptyStateProps) {
  return                    (
    <div className={`${styles.emptyState} ${onClick && styles.clickable}`} onClick={onClick}>
      <div>
        {visual}
      </div>
      <p>{text}</p>
    </div>
  );
}
