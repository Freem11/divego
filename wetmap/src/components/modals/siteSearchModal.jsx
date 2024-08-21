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
			<div className='mx-4 flex-center-column' style={{ marginTop: '-10%' }}>
				<DiveSiteAutoComplete
					setSiteSearchModalYCoord={setSiteSearchModalYCoord}
				/>
			</div>
		</>
	);
};

export default SiteSearchModal;
