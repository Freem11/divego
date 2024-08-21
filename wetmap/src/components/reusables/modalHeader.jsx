import React from 'react';
import TitleModal from './titleModal';
import CloseButton from '../closeButton/closeButton';
import CustomButton from './button/button';

const ModalHeader = ({
	title,
	onClose,
	svg,
	onClick,
	subText,
	flagIcon,
	flagHref,
}) => {
	return (
		<div className='m-2'>
			<div className='col-12 flex-row'>
				<div className='col-7 flex-row'>
					<div className='flex-column-space-between mx-2'>
						<TitleModal title={title} />
						{subText && (
							<h3 className='diveSiteSubText'>Added by: {subText}</h3>
						)}
					</div>
				</div>
				<div className='col-5 flex-row' style={{ justifyContent: 'flex-end' }}>
					{flagIcon && (
						<div>
							<a href={flagHref}>{flagIcon}</a>
						</div>
					)}
					{svg && onClick && <CustomButton onClick={onClick} svg={svg} />}
					<CloseButton onClick={onClose} />
				</div>
			</div>
		</div>
	);
};

export default ModalHeader;
