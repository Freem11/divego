import React, { InputHTMLAttributes, useRef, useState } from 'react';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../buttonIcon';

import './style.scss';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
type CustomInputProps = {
  onSave: (value: string) => void
  error?: any
  value?: string
};

const PlainTextInput = React.forwardRef<HTMLInputElement, TextInputProps & CustomInputProps>(function PlainTextInput(props: TextInputProps & CustomInputProps, forwardedRef) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [value, setValue] = useState(props.value);
  const ref = useRef<HTMLDivElement>(null);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className="ssrc-plain-text-input">
      <input type="hidden" name={props.name} value={value} onChange={props.onChange} ref={forwardedRef} />

      <div
        ref={ref}
        onKeyDown={onKeyDown}
        suppressContentEditableWarning={true}
        className="ssrc-plain-text-input__textarea"
        contentEditable={!props.readOnly && isEditModeOn}
        onInput={function (e) {
          setValue(e.currentTarget.innerHTML);
        }}
      >
        {props.value || (!isEditModeOn && props.placeholder)}
      </div>

      {!props.readOnly && isEditModeOn && (
        <ButtonIcon
          className="btn-sm"
          icon={<Icon name="check-bold" fill="green" />}
          onClick={() => {
            setIsEditModeOn(false);
            props.onSave(`${value}`);
          }}
        />

      )}

      {!props.readOnly && !isEditModeOn && (
        <ButtonIcon
          className="btn-sm"
          icon={<Icon name="pencil" fill="darkgrey" />}
          onClick={() => {
            setIsEditModeOn(true);
            setTimeout(function () {
              ref.current?.focus();
            }, 0);
          }}
        />

      )}
    </div>
  );
});

export default PlainTextInput;
