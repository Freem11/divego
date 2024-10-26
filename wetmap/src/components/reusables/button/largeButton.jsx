import React from 'react';
import { Label } from 'reactstrap';
import style from './largeButton.module.scss';

export default function LargeButton(props) {
  const { onClick, btnText, requestCheck, customStyle } = props;
  const isRequestCheckValid = requestCheck && requestCheck.length > 0;
  let className = style.guideLaunch;
  // Conditionally modify the className if customStyle is true
  if (customStyle) {
    className += ' ' + style.customStyle;
  }

  return (
    <div onClick={onClick} className={className}>
      <Label
        style={{
          color:  isRequestCheckValid ? 'lightgrey' : 'gold',
          cursor: 'pointer',
        }}
      >
        {btnText}
      </Label>
    </div>
  );
}
