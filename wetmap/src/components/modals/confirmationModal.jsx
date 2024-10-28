import React from 'react';
import { Label } from 'reactstrap';
import './confirmationModal.css';

const ConfirmationModal = (props) => {
  const {
    submissionItem,
    itterator2,
    setItterator2,
    itterator3,
    setItterator3,
    animateModal,
    handleClose,
    isSuccess,
  } = props;

  const tidyUp = () => {
    if (isSuccess) {
      if (submissionItem === 'dive site') {
        animateModal();
        // handleClose();
      }
      else if (submissionItem === 'sea creature submission') {
        animateModal();
        // handleClose();
      }
      else if (submissionItem === 'partner account creation request') {
        animateModal();
        // handleClose();
      }
    }
    animateModal();
  };

  let blurb = null;
  if (isSuccess) {
    blurb
      = submissionItem === 'partner account creation request'
        ? 'We are reviewing your submission. Please allow up to 24 hours for it to be reviewed and approved. \n \n We may contact you if we need to confirm any discrepancies.'
        : 'Please allow up to 24 hours for it to be reviewed and approved.';
  }
  else {
    if (submissionItem === 'sea creature submission') {
      blurb
        = 'The Image has not yet completed processing, please wait for the indicator to turn green, which indicates that it is ready, and try again.';
    }
    else if (submissionItem === 'dive site') {
      blurb
        = 'Your dive site submission is still missing required information, please make changes and when the indicator turns green your submission will be ready to submit.';
    }
    else if (submissionItem === 'partner account creation request') {
      blurb
        = 'Your request is still missing required information, please ensure that you fill out all fields to successfully complete your request.';
    }
  }

  const buttonClass = isSuccess ? 'OKbuttonS' : 'OKbuttonF';

  return (
    <div className="containerModal">
      <div className="titleModal">
        <Label className="textModal" style={{ width: '100%' }}>
          {isSuccess
            ? `Your ${submissionItem} was successfully submitted!`
            : `Your ${submissionItem} cannot be completed just yet.`}
        </Label>
        <Label className="text2Modal" style={{ width: '100%' }}>
          {blurb}
        </Label>
        <div onClick={() => tidyUp()} className={buttonClass}>
          <Label
            style={{
              fontFamily: 'Itim',
              fontWeight: 'bold',
              color:      'gold',
              cursor:     'pointer',
              fontSize:   '1.5vw',
            }}
          >
            OK
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
