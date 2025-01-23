import React from 'react';
import style from './style.module.scss';

export type RoundButtonProps = {
  onClick?:   () => void
  icon?:      React.ReactNode
  className?: string
};

export default function RoundButtonIcon(props: RoundButtonProps) {
  return (
    <button onClick={props.onClick} className={`btn ${style.button} ${props.className ?? ''}`}>
      <i className={style.icon}>{props.icon}</i>
    </button>
  );
}
