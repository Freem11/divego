import React from 'react';
import {
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import MapView from './map/map';

const libraries: Libraries = ['places', 'visualization'];

export default function MapLoader() {
  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <MapView></MapView>;
}
