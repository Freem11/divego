import { useState, useContext, useEffect, useRef } from 'react';
import './siteSubmitter.css';
import { TutorialContext } from '../contexts/tutorialContext';
import PlacesAutoComplete from '../locationSearch/placesAutocomplete';
import ModalHeader from '../reusables/modalHeader';

const MapSearchModal = (props) => {
	const { animateMapSearchModal, setMapSearchYCoord, mapSearchYCoord } = props;

	return (
		<>
			<ModalHeader title={'Map Search'} onClose={animateMapSearchModal} />

			<div className='flex-center-column' style={{ marginTop: '-10%' }}>
				<PlacesAutoComplete
					setMapSearchYCoord={setMapSearchYCoord}
					mapSearchYCoord={mapSearchYCoord}
				/>
			</div>
		</>
	);
};

export default MapSearchModal;
