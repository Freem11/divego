import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import anchorIcon from '../../../../images/mapIcons/AnchorBlue1.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';

type MarkerDiveSiteProps = {
  id:    number
  title: string
  lat:   number
  lng:   number
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);

  return (
    <Marker
      key={props.id}
      position={{ lat: props.lat, lng: props.lng }}
      icon={anchorIcon}
      title={props.title}
      onClick={() => {
        modalShow(DiveSite, {
          size: 'large',
          id:   props.id,
        });
      }}
    >
    </Marker>
  );
}
