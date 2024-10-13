import React from 'react';
import style from './submitButton.module.scss';

export default function SubmitButton(_props) {
  const { active, ...props } = _props;
  let className = style.button;
  if (active) {
    className += ' ' + style.highlighted;
  }

  return (
    <div>
      <button {...props} className={className}>
        {props.children}
      </button>
    </div>
  );
}
