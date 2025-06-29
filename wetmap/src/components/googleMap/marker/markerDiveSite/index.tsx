import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorBlue1.png';
import iconGold from '../../../../images/mapIcons/AnchorGold.png';
import { ModalContext } from '../../../reusables/modal/context';
import DiveSite from '../../../newModals/diveSite';
import { SitesArrayContext } from '../../../contexts/sitesArrayContext';
import { MapContext } from '../../mapContext';
import iconConfig from '../../../../icons/_config.json';

type MarkerDiveSiteProps = {
  id:       number
  title:    string
  position: google.maps.LatLngLiteral
};

export function MarkerDiveSite(props: MarkerDiveSiteProps) {
  const { modalShow } = useContext(ModalContext);
  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const { mapConfig } = useContext(MapContext);

  const svg1 = `<svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path style="transform: scale(0.85); transform-origin: center" fill="skyblue" d="${iconConfig.anchor[1]}"/>
  </svg>`;
  const url1 = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg1);

  const svg2 = `<svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <path style="transform: scale(0.85); transform-origin: center" fill="gold" d="${iconConfig.anchor[1]}"/>
  </svg>`;
  const url2 = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg2);

  const url = sitesArray.includes(props.id) ? url2 : url1;

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
      icon={url}
      title={props.title}
      position={props.position}
      onClick={handleClick}
    >
    </Marker>
  );
}
