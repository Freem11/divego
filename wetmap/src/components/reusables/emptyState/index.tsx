import React from 'react';
import styles from './style.module.scss';

type EmptyStateProps = {
  visual: React.ReactNode
  text:   string
};

export default function EmptyState({ visual, text }: EmptyStateProps) {
  return                    (
    <div className={styles.emptyState}>
      <div>
        {visual}
      </div>
      <p>{text}</p>
    </div>
  );
}
