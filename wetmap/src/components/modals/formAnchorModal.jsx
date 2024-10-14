import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './formAnchorModal.css';
import { PinContext } from '../contexts/staticPinContext';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { PictureContext } from '../contexts/pictureContext';
import { removePhoto } from '../../supabaseCalls/uploadSupabaseCalls';
const style = {
  position:     'absolute',
  width:        '780px',
  top:          '50%',
  left:         '50%',
  transform:    'translate(-50%, -50%)',
  bgcolor:      'darkblue',
  boxShadow:    24,
  // p: 1.5,
  borderRadius: '10px',
};

let filePath = './wetmap/src/components/uploads/';

const FormAnchorModal = React.memo(function FormAnchorModal(props) {
  const { openup, closeup, children } = props;
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { photoFile, setPhotoFile } = useContext(PictureContext);


  const handleClose = () => {
    setPin({ ...pin,
      PicFile:   '',
      Animal:    '',
      PicDate:   '',
      Latitude:  '',
      Longitude: '',
    });
    setAddSiteVals({ ...addSiteVals,
      Site:      '',
      Latitude:  '',
      Longitude: '',
    });
    if (photoFile) {
      removePhoto({ filePath: filePath, fileName: photoFile });
    }
    setPhotoFile(null);

    closeup();
  };

  return (
    <div>
      <Modal open={openup} onClose={closeup}>
        <Box sx={style}>
          <div className="modalBoxAnchor" onClick={handleClose}>
            X
          </div>
          {children}
        </Box>
      </Modal>
    </div>
  );
});

export default FormAnchorModal;
