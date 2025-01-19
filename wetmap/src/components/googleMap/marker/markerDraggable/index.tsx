import React, { useContext, useState } from 'react';
import { Marker } from '@react-google-maps/api';
import mantaIcon from '../../../../images/Manta32.png';
import { MapContext } from '../../mapContext';

type MarkerDraggableProps = {
  position?:      google.maps.LatLngLiteral
};

export function MarkerDraggable(props: MarkerDraggableProps) {
  const { mapRef, setDraggablePoint } = useContext(MapContext);
  const initialPosition = props.position || mapRef?.getCenter();
  const [pin, setPin] = useState<google.maps.Marker | null>(null);

  const onLoad = (marker: google.maps.Marker) => {
    setPin(marker);
    const position = marker.getPosition();
    if (position) {
      setDraggablePoint({ lat: position.lat(), lng: position.lng() });
    }
  };

  const onDragEnd = () => {
    if (pin) {
      const position = pin.getPosition();
      if (position) {
        setDraggablePoint({ lat: position.lat(), lng: position.lng() });
      }
    }
  };

  if (!initialPosition) {
    return null;
  }

  return (
    <Marker
      position={initialPosition}
      draggable={true}
      icon={mantaIcon}
      onLoad={onLoad}
      onDragEnd={onDragEnd}
    >
    </Marker>
  );
}
