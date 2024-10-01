import PlacesAutoComplete from '../locationSearch/placesAutocomplete';
import ModalHeader from '../reusables/modalHeader';

const MapSearchModal = (props) => {
	return (
		<>
			<ModalHeader title={'Map Search'} onClose={props.onModalCancel} />

			<div className='flex-center-column' style={{ marginTop: '-10%' }}>
				<PlacesAutoComplete/>
			</div>
		</>
	);
};

export default MapSearchModal;
