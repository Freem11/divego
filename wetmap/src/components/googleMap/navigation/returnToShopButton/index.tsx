import React, { useContext } from 'react';
import { MapContext } from '../../mapContext';
import { ModalContext } from '../../../reusables/modal/context';
import Button from '../../../reusables/button';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { DiveShopContext } from '../../../contexts/diveShopContext';
import ShopModal from '../../../newModals/shopModal';
import { useTranslation } from 'react-i18next';

export function ReturnToShopButton() {
  const { mapRef, setMapConfig } = useContext(MapContext);
  const { modalShow } = useContext(ModalContext);
  const { selectedShop } = useContext(DiveShopContext);
  const { setSitesArray } = useContext(SitesArrayContext);
  const { t } = useTranslation();
  return (
    <Button
      className="btn-md bg-primary"
      type="button"
      onClick={() => {
        if (selectedShop) {
          mapRef?.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
          modalShow(ShopModal, {
            id:   selectedShop.id,
            size: 'large',
          });
        }
        setMapConfig(0);
        setSitesArray([]);
      }}
    >
      {t('GoogleMap.shopButton')}
    </Button>
  );
}
