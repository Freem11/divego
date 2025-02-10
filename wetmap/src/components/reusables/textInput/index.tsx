import React, { DetailedHTMLProps, InputHTMLAttributes  } from 'react';
import './style.scss';

export type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  iconLeft?:  React.ReactNode
  iconRight?: React.ReactNode
  error?:     any
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(props: TextInputProps, ref) {
  const { iconLeft, iconRight, className, error, ...rest } = props;

  return (
    <div className={`${className ?? ''} ssrc-text-input ${error ? 'ssrc-text-input--error' : ''}`}>
      {iconLeft && <i className="ssrc-text-input__icon-left">{iconLeft}</i>}
      <input ref={ref} {...rest} />
      {iconRight && <i className="ssrc-text-input__icon-right">{iconRight}</i>}
    </div>
  );
});

export default TextInput;
