import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import icon from '../../../../images/mapIcons/AnchorCluster.png';
import { MapContext } from '../../mapContext';

type MarkerDiveSiteClusterProps = {
  expansionZoom: number
  pointCount:    number
  position:      google.maps.LatLngLiteral
};

export function MarkerDiveSiteCluster(props: MarkerDiveSiteClusterProps) {
  const { mapRef } = useContext(MapContext);

  return (
    <Marker
      icon={icon}
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
