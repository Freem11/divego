import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import style from './style.module.scss';


type StandardButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type ButtonProps = {
  onClick?:   () => void
  iconLeft?:  React.ReactNode
  iconRight?: React.ReactNode
  className?: string
  children?:  React.ReactNode
};

export default function Button(props: ButtonProps & StandardButtonProps) {
  const { iconLeft, iconRight, className, children, ...rest } = props;
  return (
    <button {...rest} className={`btn ${style.button} ${className ?? ''}`}>
      {iconLeft && (
        <i className={style.iconLeft}>
          {iconLeft}
        </i>
      )}

      {children && (
        <span className={style.label}>
          {children}
        </span>
      )}

      {iconRight && (
        <i className={style.iconRight}>
          {iconRight}
        </i>
      )}
    </button>
  );
}
