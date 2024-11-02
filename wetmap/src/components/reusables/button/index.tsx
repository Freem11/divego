import React from 'react';
import style from './style.module.scss';

export type ButtonProps = {
  onClick:    () => void
  iconLeft?:  React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  children?:  React.ReactNode
};

export default function Button(props: ButtonProps) {
  return (
    <button onClick={props.onClick} className={`btn ${style.button} ${props.className ?? ''}`}>
      {props.iconLeft && <i className={style.iconLeft}>{props.iconLeft}</i>}

      {props.children && <span className={style.label}>{props.children}</span>}

      {props.iconRight && <i className={style.iconRight}>{props.iconRight}</i>}
    </button>
  );
}
