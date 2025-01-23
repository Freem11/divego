import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/DiveCentre24x24.png';
import { ModalContext } from '../../../reusables/modal/context';
import ShopModal from '../../../newModals/shopModal';

type MarkerDiveShopProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveShop(props: MarkerDiveShopProps) {
  const { modalShow } = useContext(ModalContext);

  return (
    <Marker
      icon={icon}
      title={props.title}
      position={props.position}
      onClick={() => {
        modalShow(ShopModal, {
          id:   props.id,
          size: 'large',
        });
      }}
    >
    </Marker>
  );
}
