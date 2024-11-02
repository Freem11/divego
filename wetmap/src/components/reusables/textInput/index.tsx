import React, { DetailedHTMLProps, InputHTMLAttributes  } from 'react';
import style from './style.module.scss';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CustomInputProps = {
  iconLeft?:  React.ReactNode
  iconRight?: React.ReactNode
};

const TextInput = React.forwardRef(function TextInput(props: TextInputProps & CustomInputProps, ref) {
  const { iconLeft, iconRight, className, ...rest } = props;
  return (
    <div className={`${className ?? ''} ${style.textInput}`}>
      {iconLeft && <i className={style.iconLeft}>{iconLeft}</i>}
      <input ref={ref} {...rest} />
      {iconRight && <i className={style.iconRight}>{iconRight}</i>}
    </div>
  );
});

export default TextInput;
