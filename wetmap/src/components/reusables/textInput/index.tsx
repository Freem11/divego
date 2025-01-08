import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import style from './style.module.scss';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CustomInputProps = {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  error?: any,
};

const TextInput = React.forwardRef(function TextInput(props: TextInputProps & CustomInputProps, ref) {
  const { iconLeft, iconRight, className, error, ...rest } = props;

  return (
    <div className={`${className ?? ''} ${style.textInput} ${error ? style.error : ''}`}>    
      {iconLeft && <div className={style.iconLeft}>{iconLeft}</div>}
      <input ref={ref} {...rest} />
      {iconRight && <i className={style.iconRight}>{iconRight}</i>}
    </div>
  );
});

export default TextInput;
