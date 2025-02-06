import React from 'react';
import styles from './style.module.scss';

type EmptyStateProps = {
  visual:   React.ReactNode
  text:     string
  onClick?: () => void
  error:    boolean
};

export default function EmptyState({ visual, text, onClick, error }: EmptyStateProps) {
  return                    (
    <div className={`${styles.emptyState} ${onClick && styles.clickable} ${error && styles.error}`} onClick={onClick}>
      <div>
        {visual}
      </div>
      <p>{text}</p>
    </div>
  );
}
