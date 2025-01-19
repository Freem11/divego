import React, { useContext } from 'react';
import { Marker } from '@react-google-maps/api';
import anchorClusterIcon from '../../../../images/mapIcons/AnchorCluster.png';
import { MapContext } from '../../mapContext';
import { Cluster, SuperclusterInstance } from '../../types';

type MarkerDiveSiteClusterProps = {
  cluster:      Cluster
  supercluster: SuperclusterInstance
};

export function MarkerDiveSiteCluster(props: MarkerDiveSiteClusterProps) {
  const { mapRef } = useContext(MapContext);
  const [longitude, latitude] = props.cluster.geometry.coordinates;
  const { point_count: pointCount } = props.cluster.properties;

  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      title={pointCount?.toString() + ' locations'}
      icon={anchorClusterIcon}
      onClick={() => {
        const expansionZoom = Math.min(
          props.supercluster.getClusterExpansionZoom(props.cluster.id),
          14,
        );
        if (mapRef) {
          mapRef.setZoom(expansionZoom);
          mapRef.panTo({ lat: latitude, lng: longitude });
        };
      }}
    >
    </Marker>
  );
}
