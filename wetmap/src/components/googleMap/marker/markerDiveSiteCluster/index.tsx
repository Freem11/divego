import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorCluster.png';
import { MapContext } from '../../mapContext';
import iconConfig from '../../../../icons/_config.json';

type MarkerDiveSiteClusterProps = {
  expansionZoom: number
  pointCount:    number
  position:      google.maps.LatLngLiteral
};

export function MarkerDiveSiteCluster(props: MarkerDiveSiteClusterProps) {
  const { mapRef } = useContext(MapContext);
  const svg = `<svg width="40" height="40" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  // <circle fill="gray" cx="256" cy="256" r="256"/>
  // <path fill="white" d="${iconConfig['anchors2'][1]}"/>
  // </svg>`;
  const url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  console.log(url);
  return (
    <Marker
      icon={{ url  }}
      // icon={icon}
      // icon={{ path: iconConfig['anchors2'][1], fillColor: '#00FF00', fillOpacity: 1, strokeColor: 'green', strokeWeight: 1,  scale: 0.1 }}
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
