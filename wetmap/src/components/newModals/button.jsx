import React from 'react';
import { Label } from 'reactstrap';
import style from './button.module.scss';
import Icon from '../../icons/Icon';

export default function Button(props) {
  const { onClick, btnText, altStyle, icon } = props;

  return (
    <div
      onClick={onClick}
      className={altStyle ? style.invertedStyle : style.defaultStyle}
    >
      <Label
        style={{
          color:  altStyle ? style.invertedStyleText : style.defaultStyleText,
          cursor: 'pointer',
        }}
      >
        {btnText}
      </Label>
      {icon
        ? (
            <Icon
              name="chevron-right"
              fill="white"
              width="60px"
            />
          )
        : null}
    </div>
  );
}
