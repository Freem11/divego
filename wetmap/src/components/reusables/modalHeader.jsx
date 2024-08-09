import React from 'react';
import TitleModal from './titleModal';
import CloseButton from '../closeButton/closeButton';
import CustomButton from './button/button';

const ModalHeader = ({ title, onClose, svg, onClick }) => {
	return (
		<div className='p-4'>
			<div
				className='rows'
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<TitleModal title={title} />
        {svg && onClick && (
          <CustomButton
            onClick={onClick}
            svg={svg}
          />
        )}
				<CloseButton onClick={onClose} />
			</div>
		</div>
	);
};

export default ModalHeader;
