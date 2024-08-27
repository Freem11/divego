import React from 'react';
import style from './button.module.scss';
import { Label } from 'reactstrap';

export default function Button(props) {
	const { onClick, svg, btnState, imgButState, className, text } = props;

	let btnBox, iconStyles, labelStyles;

	if (imgButState) {
		btnBox = `${style.btnBox2} ${style.picSelectDivAlt}`;
		iconStyles = style.iconStylesAlt;
		labelStyles = style.labelStyleAlt;
	} else {
		btnBox = btnState ? style.btnBox2 : style.btnBox;
		iconStyles = btnState ? style.iconStylesAlt : style.iconStyles;
		labelStyles = style.labelStyle;
	}

	// Append `picSelectDiv` class if `text` is present
	if (text && !imgButState) {
		btnBox += ` ${style.picSelectDiv}`;
	}
	const buttonClassName = `${btnBox} ${className || ''}`;

	// Clone the SVG element and apply the styles conditionally
	const StyledSvg = React.cloneElement(svg, { className: iconStyles });

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
