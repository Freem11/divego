import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import PlacesAutoComplete from '../locationSearch/placesAutocomplete';
import CloseButton from '../closeButton/closeButton';
import TitleModal from '../reusables/titleModal';

const MapSearchModal = (props) => {
	const { animateMapSearchModal, setMapSearchYCoord, mapSearchYCoord } = props;

	return (
		<div className='masterDiv'>
			<div className='titleDiv'>
				<TitleModal title={'Map Search'} />
				<CloseButton onClick={animateMapSearchModal} />
			</div>

			<div className='mainBlurbDiv'>
				<PlacesAutoComplete
					setMapSearchYCoord={setMapSearchYCoord}
					mapSearchYCoord={mapSearchYCoord}
				/>
			</div>
		</div>
	);
};

export default MapSearchModal;
