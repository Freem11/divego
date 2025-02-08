import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorBlue1.png';
import iconGold from '../../../../images/mapIcons/AnchorGold.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { MapContext } from '../../mapContext';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapConfig } = useContext(MapContext);

  function handleClick() {
    if (mapConfig !== 3) {
      modalShow(DiveSite, {
        id:   props.id,
        size: 'large',
      });
    } else {
      if (sitesArray.includes(props.id)) {
        setSitesArray(prev => prev.filter(id => id !== props.id));
      } else {
        setSitesArray(prev => [...prev, props.id]);
      }
    }
  }

  return (
    <Marker
      icon={sitesArray.includes(props.id) ? iconGold : icon}
      title={props.title}
      position={props.position}
      onClick={handleClick}
    >
    </Marker>
  );
}
