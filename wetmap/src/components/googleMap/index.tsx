import React, { useContext, useEffect, useMemo, useState } from 'react';

import { MapContext } from './mapContext';
import { PhotoContext } from '../contexts/photoContext';
import { DiveSiteContext } from '../contexts/diveSiteContext';
import { DiveShopContext } from '../contexts/diveShopContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { debounce } from '../reusables/_helpers/debounce';
import MapView from './view';


export default function MapLoader() {
  const mapContext = useContext(MapContext);
  const [tempMarker, setTempMarker] = useState<{ lat: number, lng: number } | null>(null);
  const { sitesArray } = useContext(SitesArrayContext);

  const diveSiteContext = useContext(DiveSiteContext);
  const diveShopContext = useContext(DiveShopContext);
  const photoContext = useContext(PhotoContext);

  const center = useMemo(() => ({
    lat: mapContext.initialPoint[0],
    lng: mapContext.initialPoint[1],
  }), []);

  const handleOnLoad = (map: google.maps.Map) => {
    mapContext.setMapRef(map);
  };

  const handleBoundsChange = debounce(async () => {
    if (!mapContext.mapRef) {
      return;
    }
    const boundaries = mapContext.mapRef.getBounds();
    if (boundaries) {
      mapContext.setBoundaries(boundaries);
    }
  }, 500);

  useEffect(() => {
    if (mapContext.mapRef) {
      if (diveSiteContext.selectedDiveSite && !diveSiteContext.selectedDiveSite.lat) {
        setTempMarker({
          lat: diveSiteContext.selectedDiveSite.lat,
          lng: diveSiteContext.selectedDiveSite.lng,
        });
      }
    }

    setTimeout(() => {
      setTempMarker(null);
    }, 2000);
  }, [diveSiteContext.selectedDiveSite]);


  return (
    <MapView
      googleMapApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      mapConfig={mapContext.mapConfig}
      center={center}
      tempMarker={tempMarker}
      onLoad={handleOnLoad}
      handleBoundsChange={handleBoundsChange}
      heatPoints={photoContext.heatPoints}
      diveSites={diveSiteContext.basicCollection.items}
      diveShops={diveShopContext.collection.items}
    />
  );
}
