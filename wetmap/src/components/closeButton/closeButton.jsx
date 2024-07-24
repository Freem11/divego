import { Button } from 'reactstrap';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({
	onClick,
	className,
	btnStyle,
	iconStyle = { color: '#F0EEEB', width: '2vw', height: '5vh' },
}) => {
	return (
		<Button
			variant='text'
			className={className}
			onClick={onClick}
			// style={btnStyle}
			style={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'transparent',
				border: 'none',
				cursor: 'pointer',
			}}
		>
			<CloseIcon
				// sx={iconStyle}
				sx={{
					color: 'lightgrey',
					width: '2vw',
					height: '5vh',
					cursor: 'pointer',
					marginRight: '-3px',
					// marginLeft: '10px',
				}}
			></CloseIcon>
		</Button>
	);
};

export default CloseButton;
