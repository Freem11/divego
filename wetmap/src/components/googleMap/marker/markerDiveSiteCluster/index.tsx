import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import { MapContext } from '../../mapContext';
import iconConfig from '../../../../icons/_config.json';

type MarkerDiveSiteClusterProps = {
  expansionZoom: number
  pointCount:    number
  position:      google.maps.LatLngLiteral
};

export function MarkerDiveSiteCluster(props: MarkerDiveSiteClusterProps) {
  const { mapRef } = useContext(MapContext);
  const svg = `<svg width="30" height="30" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <circle fill="gray" cx="256" cy="256" r="256"/>
  <path style="transform: scale(0.85); transform-origin: center" fill="white" d="${iconConfig['anchors'][1]}"/>
  </svg>`;
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

  return (
    <Marker
      icon={{ url }}
      title={props.pointCount + ' locations'}
      position={props.position}
      onClick={() => {
        const expansionZoom = Math.min(props.expansionZoom, 14);
        if (mapRef) {
          mapRef.setZoom(expansionZoom);
          mapRef.panTo(props.position);
        };
      }}
    >
    </Marker>
  );
}
