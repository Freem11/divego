import React, { useId } from 'react';
import styles from './style.module.scss';

type LabelProps = {
  className?: string
  children?:  React.ReactElement
  label?:     React.ReactNode
};

export default function Label({ label, children, className }: LabelProps) {
  const id = useId();
  return (
    <div className={`${styles.field} ${className}`}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      { children && React.cloneElement(children, { id: id }) }
    </div>
  );
};
