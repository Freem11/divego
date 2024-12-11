import React from 'react';
import { Label } from 'reactstrap';
import style from './largeButton.module.scss';

export default function LargeButton(props) {
  const { onClick, btnText, altStyle } = props;

  return (
    <div onClick={onClick} className={altStyle ? style.invertedStyle :style.defaultStyle}>
      <Label
        style={{
          color:  altStyle ? style.invertedStyleText : style.defaultStyleText,
          cursor: 'pointer',
        }}
      >
        {btnText}
      </Label>
    </div>
  );
}
