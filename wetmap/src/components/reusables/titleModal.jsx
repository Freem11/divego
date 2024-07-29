import { Label } from 'reactstrap';

const TitleModal = ({ title, className }) => {
	return (
		<div className='column col-9'>
			<Label
				style={{
					width: '100vw',
					marginLeft: '1vw',
					textAlign: 'left',
					fontFamily: 'Patrick Hand',
					fontSize: '2vw',
					color: '#F0EEEB',
				}}
			>
				<strong>{title}</strong>
			</Label>
		</div>
	);
};

export default TitleModal;
