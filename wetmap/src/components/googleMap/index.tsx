import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import MapView from './view';
import { setupClusters, setupShopClusters } from './mapPinHelpers';
import { MapContext } from './mapContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { Cluster, LatLngObject } from './types';
import useSupercluster from 'use-supercluster';
import { ModalContext } from '../reusables/modal/context';
import { debounce } from '../reusables/_helpers/debounce';
import { MapBoundariesDiveSiteContext } from '../contexts/mapBoundariesDiveSiteContext';
import { MapBoundariesDiveShopContext } from '../contexts/mapBoundariesDiveShopContext';
import { MapBoundariesPhotoContext } from '../contexts/mapBoundariesPhotoContext';
import { formatHeatVals } from './mapDataHelpers';

const libraries: Libraries = ['places', 'visualization'];

export default function MapLoader() {
  const mapContext = useContext(MapContext);
  const [tempMarker, setTempMarker] = useState<LatLngObject | null>(null);
  const { sitesArray } = useContext(SitesArrayContext);
  const { setSelectedShop } = useContext(SelectedShopContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );

  const diveSiteContext = useContext(MapBoundariesDiveSiteContext);
  const diveShopContext = useContext(MapBoundariesDiveShopContext);
  const photoContext = useContext(MapBoundariesPhotoContext);
  const { modalShow } = useContext(ModalContext);

  const mapConfigs: google.maps.MapOptions = useMemo(() => ({
    mapTypeId:             'hybrid',
    clickableIcons:        false,
    maxZoom:               18,
    minZoom:               3,
    mapTypeControl:        false,
    fullscreenControl:     false,
    disableDefaultUI:      false,
    streetViewControl:     false,

  }), []);

  const heatpointConfigs = useMemo(() => ({
    opacity: 1,
    radius:  16,
  }), []);

  const center = useMemo(() => ({
    lat: mapContext.initialPoint[0],
    lng: mapContext.initialPoint[1],
  }), []);

  const handleOnLoad = (map: google.maps.Map) => {
    if (typeof mapContext.setMapRef === 'function') {
      mapContext.setMapRef(map);
    }
  };

  const handleBoundsChange = debounce(() => {
    if (!mapContext.mapRef) {
      return;
    }
    const boundaries: google.maps.LatLngBounds | undefined = mapContext.mapRef.getBounds();
    if (boundaries) {
      mapContext.setBoundaries(boundaries);
    }
  }, 500);

  useEffect(() => {
    if (mapContext.mapRef) {
      if (selectedDiveSite && !selectedDiveSite.lat) {
        setTempMarker({
          lat: selectedDiveSite.lat,
          lng: selectedDiveSite.lng,
        });
      }
    }

    setTimeout(() => {
      setTempMarker(null);
    }, 2000);
  }, [selectedDiveSite]);


  const heatPoints = useMemo(() => {
    if (photoContext.heatPoints) {
      return formatHeatVals(photoContext.heatPoints);
    }
    return [];
  }, [photoContext.heatPoints]);


  const clusterConfig = useMemo(() => {
    const result = {
      points:  [] as Cluster[],
      zoom:    0,
      options: { radius: 75, maxZoom: 16 },
      bounds:  [] as number[],
    };
    if (mapContext.mapRef?.getZoom() && mapContext?.boundaries) {
      const shopPoints = setupShopClusters(diveShopContext?.pagedCollection?.items ? diveShopContext?.pagedCollection?.items : []);

      const sitePoints = setupClusters((diveSiteContext?.pagedCollection?.items ? diveSiteContext?.pagedCollection?.items : []), sitesArray);
      const points: Cluster[] = [...sitePoints, ...shopPoints];

      result.points = points;
      result.zoom = mapContext.mapRef?.getZoom() as number;
      result.bounds = [
        mapContext.boundaries.getSouthWest().lng(),
        mapContext.boundaries.getSouthWest().lat(),
        mapContext.boundaries.getNorthEast().lng(),
        mapContext.boundaries.getNorthEast().lat(),
      ];
    }

    return result;
  }, [mapContext.mapRef?.getZoom(), diveShopContext?.pagedCollection?.items, diveSiteContext?.pagedCollection?.items]);
  const supercluster = useSupercluster(clusterConfig);

  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <MapView
      mapRef={mapContext.mapRef}
      mapConfigs={mapConfigs}
      heatpointConfigs={heatpointConfigs}
      mapConfig={mapContext.mapConfig}
      zoom={10}
      center={center}
      tempMarker={tempMarker}
      clusters={supercluster.clusters}
      supercluster={supercluster.supercluster}
      heatpts={heatPoints}
      selectedDiveSite={selectedDiveSite}
      setSelectedDiveSite={setSelectedDiveSite}
      setSelectedShop={setSelectedShop}
      onLoad={handleOnLoad}
      handleBoundsChange={handleBoundsChange}
      modalShow={modalShow}
    >
    </MapView>
  );
}
