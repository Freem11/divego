import React from 'react';
import './button.css';

const iconStyles = {
    color: 'gold',
    width: '3.5vw',
    height: '3.5vh',
    padding: '1px',
    cursor: 'pointer',
};

const iconStylesAlt = {
	color: '#538dbd',
	width: '3.5vw',
	height: '3.5vh',
	padding: '1px',
	cursor: 'pointer',
};

export default function Button(props) {
	const { onClick, svg, btnState, className } = props;

	// Determine which styles to apply based on the state
    const appliedStyles = btnState ? iconStylesAlt : iconStyles;

    // Clone the SVG element and apply the styles conditionally
    const StyledSvg = React.cloneElement(svg, { sx: appliedStyles });

	return (
		<div className='mx-1'>
			<button
				className={`${btnState ? 'btnBox2' : 'btnBox'}`}
				onClick={onClick}
				style={className}
			>
				{StyledSvg}
			</button>
		</div>
	);
}
