import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  useJsApiLoader,
  Libraries,
} from '@react-google-maps/api';
import MapView from './view';
import { setupClusters, setupShopClusters } from './mapPinHelpers';
import { getDiveSiteData, getHeatPointData, getShopData } from './mapDataHelpers';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { AnimalContext } from '../contexts/animalContext';
import { HeatPointsContext } from '../contexts/heatPointsContext';
import { DiveSitesContext } from '../contexts/diveSitesContext';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import { Cluster, LatLngObject } from './types';
import useSupercluster from 'use-supercluster';
import { MapConfigContext } from '../contexts/mapConfigContext';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { PinSpotContext } from '../contexts/pinSpotContext';
import { ModalContext } from '../contexts/modalContext';

const libraries: Libraries = ['places', 'visualization'];

export default function MapLoader() {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [pinRef, setPinRef] = useState<google.maps.Marker | null>(null);
  const [tempMarker, setTempMarker] = useState<LatLngObject | null>(null);
  const [newSites, setnewSites] = useState<DiveSiteWithUserName[]>([]);
  const [newShops, setnewShops] = useState<DiveShop[]>([]);

  const { mapConfig } = useContext(MapConfigContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { sitesArray } = useContext(SitesArrayContext);

  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);

  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );

  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { animalVal } = useContext(AnimalContext);
  const { divesTog } = useContext(DiveSitesContext);

  const { modalShow } = useContext(ModalContext);

  const mapConfigs = useMemo(() => ({
    mapTypeId:         'hybrid',
    clickableIcons:    false,
    maxZoom:           18,
    minZoom:           3,
    mapTypeControl:    false,
    fullscreenControl: false,
    disableDefaultUI:  true,
  }), []);

  const heatpointConfigs = useMemo(() => ({
    opacity: 1,
    radius:  16,
  }), []);

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
        setHeatPts([0, 2].includes(mapConfig) ? heatPointList : []);

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
      const zoomLev = mapRef.getZoom();
      if (zoomLev) {
        setMapZoom(zoomLev);
        handleMapUpdates();
      }
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


  useEffect(() => {
    if (mapRef) {
      const position = mapRef.getCenter();
      if (position) {
        if (selectedShop && selectedShop.orgname !== '') {
          const latlng = new google.maps.LatLng(selectedShop.lat, selectedShop.lng);
          mapRef.panTo(latlng);
          setMapZoom(16);
        }
      }
    }
  }, [selectedShop]);


  useEffect(() => {
    if (mapRef) {
      const position = mapRef.getCenter();
      if (position) {
        if (selectedDiveSite && selectedDiveSite.name !== '') {
          const latlng = new google.maps.LatLng(selectedDiveSite.lat, selectedDiveSite.lng);
          mapRef.panTo(latlng);
          setMapZoom(16);
        }
      }
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

  useEffect(() => {
    if (mapConfig === 1 || mapConfig === 3) {
      setHeatPts([]);
    }
  }, [mapConfig]);

  useEffect(() => {
    if (mapConfig === 1) {
      setDragPin({ lat: mapCoords[0], lng: mapCoords[1] });
    }
  }, [mapConfig]);

  useEffect(() => {
    if (mapRef) {
      mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
    }

    handleMapUpdates();
  }, [mapCoords, divesTog, animalVal]);


  const shopPoints = mapConfig === 0 ? setupShopClusters(newShops) : [];
  const sitePoints = setupClusters(newSites, sitesArray);
  const points: Cluster[] = [...sitePoints, ...shopPoints];


  const { clusters, supercluster } = useSupercluster({
    points:  points,
    bounds:  boundaries,
    zoom:    mapZoom,
    options: { radius: 75, maxZoom: 16 },
  });

  const handlePinLoad = (marker: google.maps.Marker) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (pinRef) {
      const position = pinRef;
      if (position instanceof google.maps.LatLng && addSiteVals) {
        setAddSiteVals({
          ...addSiteVals,
          Latitude:  position.lat(),
          Longitude: position.lng(),
        });
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <MapView
      mapRef={mapRef}
      mapConfigs={mapConfigs}
      heatpointConfigs={heatpointConfigs}
      mapConfig={mapConfig}
      zoom={zoom}
      center={center}
      tempMarker={tempMarker}
      animalVal={animalVal}
      clusters={clusters}
      supercluster={supercluster}
      heatpts={heatpts}
      divesTog={divesTog}
      mapCoords={mapCoords}
      setMapCoords={setMapCoords}
      setMapZoom={setMapZoom}
      selectedDiveSite={selectedDiveSite}
      setSelectedDiveSite={setSelectedDiveSite}
      setSelectedShop={setSelectedShop}
      onLoad={handleOnLoad}
      handleMapUpdates={handleMapUpdates}
      handleBoundsChange={handleBoundsChange}
      handleMapCenterChange={handleMapCenterChange}
      handleMapZoomChange={handleMapZoomChange}
      dragPin={dragPin}
      handlePinLoad={handlePinLoad}
      handleDragEnd={handleDragEnd}
      modalShow={modalShow}
    >
    </MapView>
  );
}
