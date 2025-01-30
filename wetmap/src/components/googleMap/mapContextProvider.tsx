import React, { useState } from 'react';
import { MapContext } from './mapContext';


export type MapContextType = {
  mapRef:    google.maps.Map | null
  setMapRef: React.Dispatch<React.SetStateAction<google.maps.Map | null>>

  // MapConfigScenarios
  // 0 = Default
  // 1 = Dive Site Add
  // 2 = View Trip/Itinerary
  // 3 = Create Trip Sites List
  mapConfig:    number
  setMapConfig: React.Dispatch<React.SetStateAction<number>>

  // Boundaries of the map - currently visible area
  boundaries:    google.maps.LatLngBounds | null
  setBoundaries: React.Dispatch<React.SetStateAction<google.maps.LatLngBounds | null>>

  // Where map should bew centered on the first load
  initialPoint:    number[]
  setInitialPoint: React.Dispatch<React.SetStateAction<number[]>>

  // Draggable Marker
  draggablePoint:    google.maps.LatLngLiteral | null
  setDraggablePoint: React.Dispatch<React.SetStateAction<google.maps.LatLngLiteral | null>>
};

export const MapContextProvider = ({ children }: any) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [boundaries, setBoundaries] = useState<google.maps.LatLngBounds | null>(null);
  const [initialPoint, setInitialPoint] = useState<number[]>([49.316666, -123.066666]);
  const [mapConfig, setMapConfig] = useState<number>(0);
  const [draggablePoint, setDraggablePoint] = useState<google.maps.LatLngLiteral | null>(null);

  return (
    <MapContext.Provider value={{
      mapRef,
      setMapRef,
      mapConfig,
      setMapConfig,
      boundaries,
      setBoundaries,
      initialPoint,
      setInitialPoint,
      draggablePoint,
      setDraggablePoint,
    }}
    >
      {children}
    </MapContext.Provider>
  );
};
