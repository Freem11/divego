import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import style from './style.module.scss';
import Tooltip from '../tooltip';

type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type CustomInputProps = {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  error?: any,
  tooltip?: string
};

const TextInput = React.forwardRef(function TextInput(props: TextInputProps & CustomInputProps, ref) {
  const { iconLeft, iconRight, className, error, tooltip, ...rest } = props;

  return (
    <div className={`${className ?? ''} ${style.textInput} ${error ? style.error : ''}`}>

      {tooltip && iconLeft ? (
        <Tooltip content={tooltip}>
          <i className={style.iconLeft}>{iconLeft}</i>
        </Tooltip>
      ) : (
        iconLeft && <i className={style.iconLeft}>{iconLeft}</i>
      )}
      <input ref={ref} {...rest} />
      {iconRight && <i className={style.iconRight}>{iconRight}</i>}
    </div>
  );
});

export default TextInput;
