import React from 'react';
import {
  GoogleMap,
  Marker,
  HeatmapLayer,
} from '@react-google-maps/api';
import style from './style.module.scss';
import { Cluster, TempMarker } from './types';
import useSupercluster from 'use-supercluster';
import anchorClusterIcon from '../../images/mapIcons/AnchorCluster.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import mantaIcon from '../../images/Manta32.png';
import {
  useMemo,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { DiveSitesContext } from '../contexts/diveSitesContext';
import { AnimalContext } from '../contexts/animalContext';
import { MasterContext } from '../contexts/masterContext';
import { MinorContext } from '../contexts/minorContext';
import { PinSpotContext } from '../contexts/pinSpotContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import { HeatPointsContext } from '../contexts/heatPointsContext';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { ShopModalContext } from '../contexts/shopModalContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ZoomHelperContext } from '../contexts/zoomHelperContext';
import { CarrouselTilesContext } from '../contexts/carrouselTilesContext';
import { getDiveSiteData, getHeatPointData, getShopData } from './mapDataHelpers';
import { setupClusters, setupShopClusters, setupPinConfigs } from './mapPinHelpers';
import { ModalContext } from '../contexts/modalContext';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';

export default function MapView() {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [pinRef, setPinRef] = useState<google.maps.Marker | null>(null);
  const [tempMarker, setTempMarker] = useState<TempMarker | null>(null);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  const { masterSwitch } = useContext(MasterContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { divesTog } = useContext(DiveSitesContext);
  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);
  const { animalVal } = useContext(AnimalContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { shopModal } = useContext(ShopModalContext);

  const { setTiles } = useContext(CarrouselTilesContext);

  const { sitesArray } = useContext(SitesArrayContext);
  const [newSites, setnewSites] = useState<DiveSiteWithUserName[]>([]);
  const [newShops, setnewShops] = useState<DiveShop[]>([]);

  const { modalShow } = useContext(ModalContext);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let mapCenterTimoutHandler: number | undefined;
  let mapBoundariesTimoutHandler: number;

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

  useLayoutEffect(() => {
    setMapCoords([center.lat, center.lng]);
    setMapZoom(zoom);
    handleMapUpdates();
  }, []);

  useEffect(() => {
    setDragPin({ lat: mapCoords[0], lng: mapCoords[1] });
  }, [masterSwitch]);

  const handleOnLoad = (map: google.maps.Map) => {
    setMapRef(map);
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

  useEffect(() => {
    if (mapRef) {
      mapRef.setZoom(mapZoom);
      handleMapZoomChange();
    }
  }, [mapZoom]);

  const handleBoundsChange = async () => {
    if (mapRef) {
      window.clearTimeout(mapBoundariesTimoutHandler);
      mapBoundariesTimoutHandler = window.setTimeout(function () {
        const boundaries: google.maps.LatLngBounds | undefined = mapRef.getBounds();
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

  useEffect(() => {
    if (mapRef) {
      const position = mapRef.getCenter();
      if (position) {
        if (selectedDiveSite.SiteName !== '') {
          const latlng = new google.maps.LatLng(selectedDiveSite.Latitude, selectedDiveSite.Longitude);
          mapRef.panTo(latlng);
          setMapZoom(16);
        }
      }
      if (selectedDiveSite.Latitude !== '') {
        setTempMarker({
          lat: selectedDiveSite.Latitude,
          lng: selectedDiveSite.Longitude,
        });
      }
    }

    setTimeout(() => {
      setTempMarker(null);
    }, 2000);
  }, [selectedDiveSite]);


  useEffect(() => {
    if (mapRef) {
      const position = mapRef.getCenter();
      if (position) {
        if (selectedShop.orgName !== '') {
          const latlng = new google.maps.LatLng(selectedShop[0].lat, selectedShop[0].lng);
          mapRef.panTo(latlng);
          setMapZoom(16);
        }
      }
    }
  }, [selectedShop]);

  useEffect(() => {
    if (zoomHelper) {
      if (shopModal) {
        setMapZoom(16);
        setMinorSwitch(true);
      } else if (!shopModal) {
        setMapZoom(12);
        setMinorSwitch(false);
      }
      setZoomHelper(false);
    }

    if (mapRef) {
      mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
    }

    handleMapUpdates();
  }, [mapCoords, divesTog, animalVal]);

  const shopPoints: Cluster[]  = setupShopClusters(newShops);
  const sitePoints: Cluster[]  = setupClusters(newSites, sitesArray);
  const points: Cluster[] = [...sitePoints, ...shopPoints];

  const { clusters, supercluster } = useSupercluster({
    points,
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
      if (position instanceof google.maps.LatLng) {
        setAddSiteVals({
          ...addSiteVals,
          Latitude:  position.lat(),
          Longitude: position.lng(),
        });
      }
    }
  };

  const cleanupModals = () => {
    setTiles(true);
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName={style.mapContainer}
      options={mapConfigs}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
      onBoundsChanged={handleBoundsChange}
      onClick={cleanupModals}
    >

      {clusters
      && clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount }
            = cluster.properties;
        const { iconType, modalSetup }
            = setupPinConfigs(
              cluster.properties,
              cluster.geometry.coordinates,
              modalShow,
              selectedDiveSite,
              setSelectedDiveSite,
              setSelectedShop);

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + ' locations'}
              icon={anchorClusterIcon}
              onClick={() => {
                const expansionZoom = Math.min(
                  supercluster.getClusterExpansionZoom(cluster.id),
                  14,
                );
                if (mapRef) {
                  const position = mapRef.getCenter();
                  if (position) {
                    mapRef.setZoom(expansionZoom);
                    mapRef.panTo({ lat: latitude, lng: longitude });
                    setMapCoords([
                      latitude,
                      longitude,
                    ]);
                  }
                };
              }}
            >
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.siteID}
            position={{ lat: latitude, lng: longitude }}
            icon={iconType}
            title={cluster.properties.siteName}
            onClick={modalSetup}
          >
          </Marker>
        );
      })}

      {masterSwitch && heatpts.length > 0 && (
        <HeatmapLayer
          data={heatpts}
          options={heatpointConfigs}
        >
        </HeatmapLayer>
      )}

      {!masterSwitch && !minorSwitch && heatpts.length > 0 && (
        <HeatmapLayer
          data={heatpts}
          options={heatpointConfigs}
        >
        </HeatmapLayer>
      )}

      {tempMarker && <Marker position={tempMarker} icon={anchorIconGold}></Marker>}

      {!masterSwitch && minorSwitch && (
        <Marker
          position={dragPin}
          draggable={true}
          icon={mantaIcon}
          onLoad={handlePinLoad}
          onDragEnd={handleDragEnd}
        >
        </Marker>
      )}
    </GoogleMap>
  );
}
