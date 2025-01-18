import React, { useState } from 'react';
import { MapBoundsContext } from './mapBoundariesContext';

export type MapBoundsContextType = {
  mapRef:        google.maps.Map | null
  setMapRef:     React.Dispatch<React.SetStateAction<google.maps.Map | null>>
  boundaries:    google.maps.LatLngBounds | null
  setBoundaries: React.Dispatch<React.SetStateAction<google.maps.LatLngBounds | null>>
  mapZoom:       number
  setMapZoom:    React.Dispatch<React.SetStateAction<number>>
};

const MapBoundsContextProvider = ({ children }: any) => {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [boundaries, setBoundaries] = useState<google.maps.LatLngBounds | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(10);

  return (
    <MapBoundsContext.Provider value={{
      mapRef,
      setMapRef,
      mapZoom,
      setMapZoom,
      boundaries,
      setBoundaries,
    }}
    >
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
