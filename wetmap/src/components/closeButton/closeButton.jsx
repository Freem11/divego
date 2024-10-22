import { Button } from 'reactstrap';
import Icon from '../../icons/Icon';

const CloseButton = ({ onClick, className, btnStyle }) => {
  return (
    <div className="col-3">
      <Button
        variant="text"
        className={className}
        onClick={() => {
          if (onClick && typeof onClick === 'function') {
            onClick();
          }
        }}
        style={{
          display:         'flex',
          flexDirection:   'column',
          backgroundColor: 'transparent',
          border:          'none',
          cursor:          'pointer',
          paddingTop:      '0px',
        }}
      >
        <Icon fill="#F0EEEB" width="3vw" height="5vh" name="close" />

      </Button>
    </div>
  );
};

export default CloseButton;
