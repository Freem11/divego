import React, { TextareaHTMLAttributes } from 'react';

import './style.scss';

type TextAreaInputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: any
};

const TextAreaInput = React.forwardRef<HTMLTextAreaElement, TextAreaInputProps>(function TextAreaInput(props: TextAreaInputProps, forwardedRef) {
  const { error, ...rest } = props;
  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className={`ssrc-text-area-input ${error ? 'error' : ''}`}>
      <textarea {...rest} rows={1} onInput={onInput}  ref={forwardedRef} />
    </div>
  );
});

export default TextAreaInput;
