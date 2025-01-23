import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import screenData from '../../../newModals/screenData.json';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { DiveShopContext } from '../../../contexts/diveShopContext';

export function ReturnToShopButton() {
  const { mapRef, setMapConfig } = useContext(MapContext);
  const { modalResume } = useContext(ModalContext);
  const { selectedShop } = useContext(DiveShopContext);
  const { setSitesArray } = useContext(SitesArrayContext);

  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        if (selectedShop) {
          mapRef?.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
        }
        setMapConfig(0);
        setSitesArray([]);
        modalResume();
      }}
    >
      {screenData.GoogleMap.shopButton}
    </Button>
  );
}
