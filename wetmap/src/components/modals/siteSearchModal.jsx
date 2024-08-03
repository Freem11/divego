import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import DiveSiteAutoComplete from '../diveSiteSearch/diveSiteSearch';
import CloseButton from '../closeButton/closeButton';
import TitleModal from '../reusables/titleModal';

const SiteSearchModal = (props) => {
	const { animateSiteSearchModal, setSiteSearchModalYCoord } = props;

	return (
		<div className='masterDiv' style={{ overflow: 'hidden' }}>
			<div className='titleDiv'>
				<TitleModal title={'Dive Site Search'} />
				<CloseButton onClick={animateSiteSearchModal} />
			</div>

			<div className='mainBlurbDiv' style={{ overflow: 'hidden' }}>
				<DiveSiteAutoComplete
					setSiteSearchModalYCoord={setSiteSearchModalYCoord}
				/>
			</div>
		</div>
	);
};

export default SiteSearchModal;
