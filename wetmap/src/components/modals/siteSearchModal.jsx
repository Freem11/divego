import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import DiveSiteAutoComplete from '../diveSiteSearch/diveSiteSearch';
import ModalHeader from '../reusables/modalHeader';

const SiteSearchModal = (props) => {
	const { animateSiteSearchModal, setSiteSearchModalYCoord } = props;

	return (
		<>
			<ModalHeader
				title={'Dive Site Search'}
				onClose={animateSiteSearchModal}
			/>
			<div className='mx-4'>
				<div
					className='columns mt-6'
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignContent: 'end',
					}}
				>
					<DiveSiteAutoComplete
						setSiteSearchModalYCoord={setSiteSearchModalYCoord}
					/>
				</div>
			</div>
		</>
	);
};

export default SiteSearchModal;
