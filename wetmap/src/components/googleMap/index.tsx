import React from 'react';
import {
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
const libraries: Libraries = ['places', 'visualization'];
import Map from './map/map';

export default function MapLoader() {
  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}
