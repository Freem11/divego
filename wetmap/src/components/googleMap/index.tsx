import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { ModalContext } from '../reusables/modal/context';
import { debounce } from '../reusables/_helpers/debounce';
import { MapBoundariesDiveSiteContext } from '../contexts/mapBoundariesDiveSiteContext';
import { MapBoundariesDiveShopContext } from '../contexts/mapBoundariesDiveShopContext';
import { getHeatPointsInBoundaries } from '../../helpers/getHeatPointsInBoundaries';
import { MapBoundariesPhotoContext } from '../contexts/mapBoundariesPhotoContext';

const libraries: Libraries = ['places', 'visualization'];

export default function MapLoader() {
  // const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [pinRef, setPinRef] = useState<google.maps.Marker | null>(null);
  const [tempMarker, setTempMarker] = useState<LatLngObject | null>(null);
  const [newSites, setnewSites] = useState<DiveSiteWithUserName[]>([]);
  const [newShops, setnewShops] = useState<DiveShop[]>([]);

  const { mapConfig, setMapConfig } = useContext(MapConfigContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);

  // const { mapRef, setMapRef, diveSites, heatPoints, boundaries, setBoundaries } = useContext(MapBoundsContext);
  const  mapContext = useContext(MapBoundsContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  // const { mapZoom, setMapZoom } = useContext(ZoomContext);

  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );

  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { divesTog } = useContext(DiveSitesContext);
  const diveSiteContext = useContext(MapBoundariesDiveSiteContext);
  const diveShopContext = useContext(MapBoundariesDiveShopContext);
  const photoContext = useContext(MapBoundariesPhotoContext);

  const { modalShow, modalResume } = useContext(ModalContext);

  // const [zoom, setZoom] = useState(mapContext.mapZoom);

  // console.log('DiveSites', diveSites);

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
    if (typeof mapContext.setMapRef === 'function') {
      mapContext.setMapRef(map);
    }
  };

  let mapCenterTimoutHandler: number | undefined;
  let mapBoundariesTimoutHandler: number;

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  // const zoom = useMemo(() => mapContext.mapZoom, []);

  // const ref = useRef<number | undefined>(undefined);

  // const handleMapUpdates = async () => {
  //   if (mapContext.mapRef) {
  //     const boundaries: google.maps.LatLngBounds | undefined = mapContext.mapRef.getBounds();
  //     if (boundaries) {
  //       const latHi = boundaries.getNorthEast().lat();
  //       const latLo = boundaries.getSouthWest().lat();
  //       const lngE = boundaries.getNorthEast().lng();
  //       const lngW = boundaries.getSouthWest().lng();

  //       const diveSiteList = await getDiveSiteData(latHi, latLo, lngE, lngW);
  //       setnewSites(!divesTog ? [] : diveSiteList);

  //       const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);
  //       setHeatPts([0, 2].includes(mapConfig) ? heatPointList : []);

  //       const shoplist = await getShopData(latHi, latLo, lngE, lngW);
  //       setnewShops(!divesTog ? [] : shoplist);
  //     }
  //   }
  // };


  // console.log('Rere');

  const handleBoundsChange = debounce(() => {
    if (!mapContext.mapRef) {
      return;
    }
    const boundaries: google.maps.LatLngBounds | undefined = mapContext.mapRef.getBounds();
    if (boundaries) {
      mapContext.setBoundaries(boundaries);
      console.log('Setting boundaries to: ', boundaries);
    }
  }, 500);


  const handleMapCenterChange = async () => {
    // if (mapContext.mapRef) {
    //   const position = mapContext.mapRef.getCenter();
    //   if (position) {
    //     window.clearTimeout(mapCenterTimoutHandler);
    //     mapCenterTimoutHandler = window.setTimeout(function () {
    //       setMapCoords([position.lat(), position.lng()]);
    //       // handleMapUpdates();
    //     }, 50);
    //   }
    // }
  };

  const handleMapZoomChange = debounce(() => {
    if (!mapContext.mapRef) {
      return;
    }
    const zoomLev = mapContext?.mapRef?.getZoom();
    if (zoomLev) {
      mapContext.setMapZoom(zoomLev);
      console.log('Setting zoom to: ', zoomLev);
    }
  }, 500);

  const zoomMapOut = () => {
    mapContext.setMapZoom(prev => prev - 1);
  };

  const zoomMapIn = () => {
    mapContext.setMapZoom(prev => prev + 1);
  };

  const returnToSiteSubmitterModal = () => {
    modalResume();
    setMapConfig(0);
  };

  const returnToShopModal = () => {
    if (selectedShop) {
      setMapCoords([selectedShop.lat, selectedShop.lng]);
      mapContext.setMapZoom(16);
      setMapConfig(0);
      setSitesArray([]);
      modalResume();
    }
  };

  useLayoutEffect(() => {
    // setMapCoords([center.lat, center.lng]);
    // setMapZoom(zoom);
    // handleMapUpdates();
  }, []);

  // useEffect(() => {
  //   if (mapContext.mapRef) {
  //     mapContext.mapRef.setZoom(mapZoom);
  //     handleMapZoomChange();
  //   }
  // }, [mapZoom]);


  // useEffect(() => {
  //   if (mapContext.mapRef) {
  //     const position = mapContext.mapRef.getCenter();
  //     if (position) {
  //       if (selectedShop && selectedShop.orgname !== '') {
  //         const latlng = new google.maps.LatLng(selectedShop.lat, selectedShop.lng);
  //         mapContext.mapRef.panTo(latlng);
  //         setMapZoom(16);
  //       }
  //     }
  //   }
  // }, [selectedShop]);


  useEffect(() => {
    if (mapContext.mapRef) {
      // const position = mapContext.mapRef.getCenter();
      // if (position) {
      //   if (selectedDiveSite && selectedDiveSite.name !== '') {
      //     const latlng = new google.maps.LatLng(selectedDiveSite.lat, selectedDiveSite.lng);
      //     mapContext.mapRef.panTo(latlng);
      //     setMapZoom(16);
      //   }
      // }
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
    if (mapContext.mapRef) {
      mapContext.mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
    }

    // handleMapUpdates();
  }, [mapCoords, divesTog]);

  useEffect(() => {
    if (mapContext.boundaries) {
      diveSiteContext.fetchItems(true);
      diveShopContext.fetchItems(true);
    }
  }, [mapContext.boundaries?.toString()]);

  const shopPoints = mapConfig === 0 ? setupShopClusters(diveShopContext?.paginator?.items ? diveShopContext?.paginator?.items : []) : [];

  const sitePoints = setupClusters((diveSiteContext?.paginator?.items ? diveSiteContext?.paginator?.items : []), sitesArray);
  const points: Cluster[] = [...sitePoints, ...shopPoints];

  const latHi = mapContext?.boundaries?.getNorthEast().lat();
  const latLo = mapContext?.boundaries?.getSouthWest().lat();
  const lngE = mapContext?.boundaries?.getNorthEast().lng();
  const lngW = mapContext?.boundaries?.getSouthWest().lng();

  const { clusters, supercluster } = useSupercluster({
    points:  points,
    bounds:  [lngW, latLo, lngE, latHi],
    zoom:    mapContext.mapZoom,
    options: { radius: 75, maxZoom: 16 },
  });


  const handlePinLoad = (marker: google.maps.Marker) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (pinRef) {
      const position = pinRef.getPosition();
      if (position instanceof google.maps.LatLng) {
        setAddSiteVals({
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
      mapRef={mapContext.mapRef}
      mapConfigs={mapConfigs}
      heatpointConfigs={heatpointConfigs}
      mapConfig={mapConfig}
      setMapConfig={setMapConfig}
      returnToSiteSubmitterModal={returnToSiteSubmitterModal}
      returnToShopModal={returnToShopModal}
      zoom={mapContext.mapZoom}
      center={center}
      tempMarker={tempMarker}
      clusters={clusters}
      supercluster={supercluster}
      heatpts={photoContext.heatPoints}
      divesTog={divesTog}
      setMapCoords={setMapCoords}
      selectedDiveSite={selectedDiveSite}
      setSelectedDiveSite={setSelectedDiveSite}
      setSelectedShop={setSelectedShop}
      onLoad={handleOnLoad}
      handleBoundsChange={handleBoundsChange}
      handleMapCenterChange={handleMapCenterChange}
      handleMapZoomChange={handleMapZoomChange}
      zoomMapIn={zoomMapIn}
      zoomMapOut={zoomMapOut}
      dragPin={dragPin}
      handlePinLoad={handlePinLoad}
      handleDragEnd={handleDragEnd}
      modalShow={modalShow}
    >
    </MapView>
  );
}
