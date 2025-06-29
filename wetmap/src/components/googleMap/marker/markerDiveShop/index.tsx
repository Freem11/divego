import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/DiveCentre24x24.png';
import { ModalContext } from '../../../reusables/modal/context';
import ShopModal from '../../../newModals/shopModal';
import iconConfig from '../../../../icons/_config.json';

type MarkerDiveShopProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveShop(props: MarkerDiveShopProps) {
  const { modalShow } = useContext(ModalContext);
  const svg = `<svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <circle fill="#0073E6" cx="256" cy="256" r="256"/>
  <path style="transform: scale(0.85); transform-origin: center" fill="white" d="${iconConfig['dive-centre'][1]}"/>
  </svg>`;
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

  return (
    <Marker
      icon={{ url }}
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
