import React, { useEffect, useRef, useState } from 'react';
import style from './style.module.scss';
import Icon from '../../../icons/Icon';

export type PlainTextInputProps = {
  content:     string
  readOnly:    boolean
  placeHolder: string
  onSubmit:    (value: string) => void
};

export default function PlainTextInput(props: PlainTextInputProps) {
  const [isEditModeOn, setIsEditModeOn] = useState(false);
  const [inputValue, setInputValue] = useState(props.content);

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement | null) => {
    if (textarea) {
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  const textRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    adjustTextareaHeight(textRef.current);
  }, []);

  return (
    <div className={style.plainTextInput}>

      <textarea
        placeholder={props.placeHolder}
        ref={textRef}
        name="body"
        readOnly={props.readOnly || !isEditModeOn}
        value={inputValue}
        onChange={function (e) {
          adjustTextareaHeight(e.target);
          setInputValue(e.target.value);
        }}
      />

      {!props.readOnly && isEditModeOn && (
        <div className={style.icon}>
          <Icon
            name="check-bold"
            fill="green"
            width="30px"
            onClick={() => {
              setIsEditModeOn(false);
              props.onSubmit(inputValue);
            }}
          />
        </div>
      )}

      {!props.readOnly && !isEditModeOn && (
        <div className={style.icon}>
          <Icon
            name="pencil"
            fill="darkgrey"
            width="30px"
            onClick={() => {
              setIsEditModeOn(true);
              textRef.current?.focus();
            }}
          />
        </div>
      )}
    </div>
  );
}
