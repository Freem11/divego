import { Button } from 'reactstrap';
import CloseIcon from '@mui/icons-material/Close';

const CloseButton = ({ onClick, className, btnStyle }) => {
	return (
		<div>
			<Button
				variant='text'
				className={className}
				onClick={onClick}
				style={{
					display: 'flex',
					flexDirection: 'column',
					backgroundColor: 'transparent',
					border: 'none',
					cursor: 'pointer',
                    paddingBottom: '2px',
                    paddingTop: '0px'
				}}
			>
				<CloseIcon
					sx={{
						color: '#F0EEEB',
						width: '2vw',
						height: '5vh',
						cursor: 'pointer',
						marginRight: '-3px',
					}}
				></CloseIcon>
			</Button>
		</div>
	);
};

export default CloseButton;
