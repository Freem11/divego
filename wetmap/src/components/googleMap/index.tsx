import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import MapView from './view';
import { getDiveSiteData, getHeatPointData, getShopData } from './mapDataHelpers';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { AnimalContext } from '../contexts/animalContext';
import { HeatPointsContext } from '../contexts/heatPointsContext';
import { DiveSitesContext } from '../contexts/diveSitesContext';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';

const libraries: Libraries = ['places', 'visualization'];

export default function MapLoader() {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [newSites, setnewSites] = useState<DiveSiteWithUserName[]>([]);
  const [newShops, setnewShops] = useState<DiveShop[]>([]);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);

  const { animalVal } = useContext(AnimalContext);
  const { divesTog } = useContext(DiveSitesContext);
  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
  };

  let mapCenterTimoutHandler: number | undefined;
  let mapBoundariesTimoutHandler: number;

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);


  const handleMapUpdates = async () => {
    if (mapRef) {
      const boundaries: google.maps.LatLngBounds | undefined = mapRef.getBounds();
      if (boundaries) {
        const latHi = boundaries.getNorthEast().lat();
        const latLo = boundaries.getSouthWest().lat();
        const lngE = boundaries.getNorthEast().lng();
        const lngW = boundaries.getSouthWest().lng();

        const diveSiteList = await getDiveSiteData(latHi, latLo, lngE, lngW);
        setnewSites(!divesTog ? [] : diveSiteList);

        const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);
        setHeatPts(heatPointList);

        const shoplist = await getShopData(latHi, latLo, lngE, lngW);
        setnewShops(!divesTog ? [] : shoplist);
      }
    }
  };

  const handleBoundsChange = async () => {
    if (mapRef) {
      window.clearTimeout(mapBoundariesTimoutHandler);
      mapBoundariesTimoutHandler = window.setTimeout(function () {
        const boundaries: google.maps.LatLngBounds | undefined = mapRef?.getBounds();
        if (boundaries) {
          const latHi = boundaries.getNorthEast().lat();
          const latLo = boundaries.getSouthWest().lat();
          const lngE = boundaries.getNorthEast().lng();
          const lngW = boundaries.getSouthWest().lng();
          setBoundaries([lngW, latLo, lngE, latHi]);
        }
        handleMapUpdates();
      }, 50);
    }
  };

  const handleMapCenterChange = async () => {
    if (mapRef) {
      const position = mapRef.getCenter();
      if (position) {
        window.clearTimeout(mapCenterTimoutHandler);
        mapCenterTimoutHandler = window.setTimeout(function () {
          setMapCoords([position.lat(), position.lng()]);
          handleMapUpdates();
        }, 50);
      }
    }
  };

  const handleMapZoomChange = async () => {
    if (mapRef) {
      setMapZoom(mapRef.getZoom());
      handleMapUpdates();
    }
  };

  useLayoutEffect(() => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);
    handleMapUpdates();
  }, []);

  useEffect(() => {
    if (mapRef) {
      mapRef.setZoom(mapZoom);
      handleMapZoomChange();
    }
  }, [mapZoom]);


  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <MapView
      mapRef={mapRef}
      zoom={zoom}
      center={center}
      animalVal={animalVal}
      newSites={newSites}
      newShops={newShops}
      heatpts={heatpts}
      divesTog={divesTog}
      boundaries={boundaries}
      mapCoords={mapCoords}
      setMapCoords={setMapCoords}
      mapZoom={mapZoom}
      setMapZoom={setMapZoom}
      onLoad={handleOnLoad}
      handleMapUpdates={handleMapUpdates}
      handleBoundsChange={handleBoundsChange}
      handleMapCenterChange={handleMapCenterChange}
      handleMapZoomChange={handleMapZoomChange}
    >
    </MapView>
  );
}
