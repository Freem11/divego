import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import screenData from '../../../newModals/screenData.json';

export function ReturnToCreateTripButton() {
  const { setMapConfig } = useContext(MapContext);
  const { modalResume } = useContext(ModalContext);


  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        setMapConfig(0);
        modalResume();
      }}
    >
      {screenData.GoogleMap.sitesButton}
    </Button>
  );
}
