import React from 'react';
import styles from './style.module.scss';

type EmptyStateProps = {
  visual: React.ReactNode
  text:   string
  error:  boolean
};

export default function EmptyState({ visual, text, error }: EmptyStateProps) {
  return (
    <div className={`${styles.emptyState} ${error && styles.error}`}>
      <div>
        {visual}
      </div>
      <p>{text}</p>
    </div>
  );
}
