import React from 'react';
import style from './style.module.scss';

export type ButtonProps = {
  onClick?:   (event?: React.MouseEvent<HTMLButtonElement>) => void
  icon?:      React.ReactNode
  className?: string
};

export default function ButtonIcon(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`btn ${style.button} ${props.className ?? ''}`}>
      <i className={style.icon}>{props.icon}</i>
    </button>
  );
}
