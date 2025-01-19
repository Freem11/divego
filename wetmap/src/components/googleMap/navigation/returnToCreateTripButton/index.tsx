import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import screenData from '../../../newModals/screenData.json';
import { SelectedShopContext } from '../../../contexts/selectedShopContext';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';

export function ReturnToCreateTripButton() {
  const { mapRef, setMapConfig } = useContext(MapContext);
  const { modalResume } = useContext(ModalContext);
  const { selectedShop } = useContext(SelectedShopContext);
  const { setSitesArray } = useContext(SitesArrayContext);

  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        // should this onClick be the same as the returnToShopButton??
        if (selectedShop) {
          mapRef?.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
        }
        setMapConfig(0);
        setSitesArray([]);
        modalResume();
      }}
    >
      {screenData.GoogleMap.sitesButton}
    </Button>
  );
}
