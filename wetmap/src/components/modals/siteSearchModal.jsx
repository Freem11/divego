import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import DiveSiteAutoComplete from '../diveSiteSearch/diveSiteSearch';
import ModalHeader from '../reusables/modalHeader';
import CustomButton from '../reusables/button/button';

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
			{/* <ModalHeader title={'Site Search'} onClose={animateSiteSearchModal} />
			<div>
				<DiveSiteAutoComplete
					setSiteSearchModalYCoord={setSiteSearchModalYCoord}
				/>
			</div>
			<div className='flex-row'>
				<CustomButton text={'Dive Site'} />
				<CustomButton text={'Dive Centre'} />
			</div> */}
		</>
	);
};

export default SiteSearchModal;
