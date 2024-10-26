import React from 'react';
import style from './button.module.scss';
import { Label } from 'reactstrap';

export default function Button(props) {
  const { onClick, svg, btnState, imgButState, className, text } = props;

  // Determine button styles based on the props
  let btnBox = imgButState
    ? `${style.btnBox2} ${style.picSelectDivAlt}`
    : (btnState ? style.btnBox2 : style.btnBox);

  const iconStyles = imgButState ? style.iconStylesAlt : (btnState ? style.iconStylesAlt : style.iconStyles);
  const labelStyles = imgButState ? style.labelStyleAlt : style.labelStyle;

  // Append `picSelectDiv` class if `text` is present and `imgButState` is false
  if (text && !imgButState) {
    btnBox += ` ${style.picSelectDiv}`;
  }

  const buttonClassName = `${btnBox} ${className || ''}`;

  // Clone the SVG element and apply the styles conditionally
  const StyledSvg = svg ? React.cloneElement(svg, { className: iconStyles }) : null;

  return (
    <div className="mx-1">
      <button
        className={buttonClassName}
        onClick={onClick}
      >
        {StyledSvg}
        {text && <Label className={labelStyles}>{text}</Label>}
      </button>
    </div>
  );
}
