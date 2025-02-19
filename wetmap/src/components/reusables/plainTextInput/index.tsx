import React, { InputHTMLAttributes, useRef, useState } from 'react';
import Icon from '../../../icons/Icon';
import ButtonIcon from '../buttonIcon';

import './style.scss';
import Tooltip from '../tooltip';

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;
type CustomInputProps = {
  onSave:              (value: string) => void
  error?:              any
  value?:              string
  tooltipEditText?:    string
  tooltipConfirmText?: string
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

  const determineTooltipEdit = () => {
    if (props.tooltipConfirmText) {
      return (
        <Tooltip content={props.tooltipEditText}>
          <Icon name="pencil" fill="darkgrey" />
        </Tooltip>
      );
    } else {
      return (
        <Icon name="pencil" fill="darkgrey" />
      );
    }
  };

  const determineTooltipConfirm = () => {
    if (props.tooltipConfirmText) {
      return (
        <Tooltip content={props.tooltipConfirmText}>
          <Icon name="check-bold" fill="green" />
        </Tooltip>
      );
    } else {
      return (
        <Icon name="check-bold" fill="green" />
      );
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
          icon={determineTooltipConfirm()}
          onClick={() => {
            setIsEditModeOn(false);
            props.onSave(`${value}`);
          }}
        />

      )}

      {!props.readOnly && !isEditModeOn && (
        <ButtonIcon
          className="btn-sm"
          icon={determineTooltipEdit()}
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
