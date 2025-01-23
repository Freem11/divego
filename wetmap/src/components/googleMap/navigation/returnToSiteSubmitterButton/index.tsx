import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import screenData from '../../../newModals/screenData.json';

export function ReturnToSiteSubmitterButton() {
  const { setMapConfig } = useContext(MapContext);
  const { modalResume } = useContext(ModalContext);

  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        modalResume();
        setMapConfig(0);
      }}
    >
      {screenData.GoogleMap.pinButton}
    </Button>
  );
}
