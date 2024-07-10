import React from 'react';
import './button.css';

export default function Button(props) {
	const { onClick, svg, btnState, className } = props;

	return (
		<div>
			<button
				className={`${btnState ? 'btnBox2' : 'btnBox'}`}
				onClick={onClick}
				style={className}
			>
				{svg}
			</button>
		</div>
	);
}
