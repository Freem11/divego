import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorBlue1.png';
import iconGold from '../../../../images/mapIcons/AnchorGold.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray } = useContext(SitesArrayContext);

  return (
    <Marker
      icon={sitesArray.includes(props.id) ? iconGold : icon}
      title={props.title}
      position={props.position}
      onClick={() => {
        modalShow(DiveSite, {
          id:   props.id,
          size: 'large',
        });
      }}
    >
    </Marker>
  );
}
