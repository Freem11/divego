import { Label } from 'reactstrap';

const TitleModal = ({ title, className }) => {
	return (
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
	);
};

export default TitleModal;
