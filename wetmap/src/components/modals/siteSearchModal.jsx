import DiveSiteAutoComplete from '../diveSiteSearch/diveSiteSearch';
import ModalHeader from '../reusables/modalHeader';

const SiteSearchModal = (props) => {
	return (
		<>
			<ModalHeader
				title={'Dive Site Search'}
				onClose={props.onModalCancel}
			/>
			<div className='mx-4 flex-center-column' style={{ marginTop: '-10%' }}>
				<DiveSiteAutoComplete
					onSelect={props.onModalSuccess}
				/>
			</div>
		</>
	);
};

export default SiteSearchModal;
