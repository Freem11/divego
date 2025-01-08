import React, { useRef } from 'react';
import TextInput, { TextInputProps } from '../textInput';
import Icon from '../../../icons/Icon';
import './style.scss';

type SecureTextInputProps = TextInputProps & {
  secure?: boolean
};


const SecureTextInput = React.forwardRef<HTMLInputElement, SecureTextInputProps>(function SecureTextInput(props: SecureTextInputProps, forwardRef) {
  const [secure, setSecure] = React.useState<boolean>(props.secure ?? true);
  const ref = useRef<HTMLInputElement | null>(null);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setSecure(prev => !prev);
    ref.current?.focus();
    setTimeout(() => {
      ref.current?.setSelectionRange(ref.current.value.length, ref.current.value.length);
    }, 0);
  };

  return (
    <TextInput
      ref={(element) => {
        ref.current = element;
        if (forwardRef)
          if (typeof forwardRef === 'function') {
            forwardRef(element);
          } else {
            forwardRef.current = element;
          }
      }}
      className="ssrc-secure-text-input"
      type={secure ? 'password' : 'text'}
      iconLeft={<Icon name="lock-outline" />}
      iconRight={(
        <button type="button" onClick={onClick}>
          {secure ? <Icon name="eye-off" /> : <Icon name="eye" />}
        </button>
      )}
      {...props}
    />
  );
});

export default SecureTextInput;
