import React from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  HeatmapLayer,
  Libraries,
} from '@react-google-maps/api';
import './googleMap.css';
import useSupercluster from 'use-supercluster';
import anchorIcon from '../../images/mapIcons/AnchorBlue1.png';
import anchorClust from '../../images/mapIcons/AnchorCluster.png';
import Manta from '../../images/Manta32.png';
import gold from '../../images/mapIcons/AnchorGold.png';
import shopIOS from '../../images/face-mask.png';
import shopClustIOS from '../../images/face-mask.png';
import {
  useMemo,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from 'react';
import { CoordsContext } from '../contexts/mapCoordsContext';
import { ZoomContext } from '../contexts/mapZoomContext';
import { JumpContext } from '../contexts/jumpContext';
import { DiveSitesContext } from '../contexts/diveSitesContext';
import { SliderContext } from '../contexts/sliderContext';
import { AnimalContext } from '../contexts/animalContext';
import { PinContext } from '../contexts/staticPinContext';
import { MasterContext } from '../contexts/masterContext';
import { MinorContext } from '../contexts/minorContext';
import { PinSpotContext } from '../contexts/pinSpotContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { SelectedShopContext } from '../contexts/selectedShopContext';
import { HeatPointsContext } from '../contexts/heatPointsContext';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { ModalSelectContext } from '../contexts/modalSelectContext';
import { DiveSpotContext } from '../contexts/diveSpotContext';
import { ShopModalContext } from '../contexts/shopModalContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { ZoomHelperContext } from '../contexts/zoomHelperContext';
import { CarrouselTilesContext } from '../contexts/carrouselTilesContext';
import { IterratorContext } from '../contexts/iterratorContext';
import { Iterrator2Context } from '../contexts/iterrator2Context';
import { TutorialContext } from '../contexts/tutorialContext';
import { formatHeatVals } from '../../helpers/heatPointHelpers';
import { setupClusters, setupShopClusters } from '../../helpers/clusterHelpers';
import {
  getDiveSitesWithUser,
} from '../../supabaseCalls/diveSiteSupabaseCalls';
import {
  getHeatPointsWithUser,
  getHeatPointsWithUserEmpty,
} from '../../supabaseCalls/heatPointSupabaseCalls';
import { shops, getShopByName } from '../../supabaseCalls/shopsSupabaseCalls';
import { ModalContext } from '../contexts/modalContext';
import { ModalWindowSize } from '../reusables/modal/constants';
import DiveSite from '../newModals/diveSite/index';
import ShopModal from '../newModals/shopModal/index';

const libraries: Libraries = ['visualization', 'places'];

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [pinRef, setPinRef] = useState<google.maps.Marker | null>(null);

  const { masterSwitch } = useContext(MasterContext);
  const { minorSwitch, setMinorSwitch } = useContext(MinorContext);
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog } = useContext(DiveSitesContext);
  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { zoomHelper, setZoomHelper } = useContext(ZoomHelperContext);
  const { animalVal } = useContext(AnimalContext);
  const { sliderVal } = useContext(SliderContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );
  const { setSelectedShop } = useContext(SelectedShopContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { itterator } = useContext(IterratorContext);
  const { itterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning } = useContext(TutorialContext);

  const { shopModal, setShopModal } = useContext(ShopModalContext);

  const { setTiles } = useContext(CarrouselTilesContext);

  const { sitesArray } = useContext(SitesArrayContext);
  const [newSites, setnewSites] = useState<any>([]);
  const [newShops, setnewShops] = useState<any>([]);
  const { chosenModal } = useContext(ModalSelectContext);

  const { dragPin, setDragPin } = useContext(PinSpotContext);

  type TempMarker = {
    lat: number
    lng: number
  };

  const [tempMarker, setTempMarker] = useState<TempMarker | null>(null);

  const { modalShow } = useContext(ModalContext);

  const center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  const zoom = useMemo(() => mapZoom, []);

  let mapCenterTimoutHandler: number | undefined;
  let mapBoundariesTimoutHandler: number;

  const options = useMemo(() => ({
    mapTypeId:         'hybrid',
    clickableIcons:    false,
    maxZoom:           18,
    minZoom:           3,
    mapTypeControl:    false,
    fullscreenControl: false,
    disableDefaultUI:  true,
  }), []);

  const heatOpts = useMemo(() => ({
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

        if (lngW > lngE) {
          try {
            const AmericanDiveSites = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:      latLo,
              maxLat:      latHi,
              minLng:      -180,
              maxLng:      lngE,
            });
            const AsianDiveSites = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:      latLo,
              maxLat:      latHi,
              minLng:      lngW,
              maxLng:      180,
            });

            const diveSiteList = [...AsianDiveSites, ...AmericanDiveSites];
            setnewSites(!divesTog ? [] : diveSiteList);
          } catch (e) {
            if (e instanceof Error) {
              console.error('Error message:', e.message);
            } else {
              console.error('Unknown error', e);
            }
          }

          try {
            let AmericanHeatPoints;
            let AsianHeatPoints;
            if (animalVal.length === 0) {
              AmericanHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:      latLo,
                maxLat:      latHi,
                minLng:      -180,
                maxLng:      lngE,
              });
              AsianHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:      latLo,
                maxLat:      latHi,
                minLng:      lngW,
                maxLng:      180,
              });
            } else {
              AmericanHeatPoints = await getHeatPointsWithUser({
                myCreatures:          '',
                minLat:               latLo,
                maxLat:               latHi,
                minLng:               -180,
                maxLng:               lngE,
                animalMultiSelection: animalVal,
              });
              AsianHeatPoints = await getHeatPointsWithUser({
                myCreatures:          '',
                minLat:               latLo,
                maxLat:               latHi,
                minLng:               lngW,
                maxLng:               180,
                animalMultiSelection: animalVal,
              });
            }

            const heatPointList = [...AsianHeatPoints, ...AmericanHeatPoints];
            setHeatPts(formatHeatVals(heatPointList));
          } catch (e) {
            if (e instanceof Error) {
              console.error('Error message:', e.message);
            } else {
              console.error('Unknown error', e);
            }
          }
        } else {
          try {
            const diveSiteList = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:               latLo,
              maxLat:               latHi,
              minLng:               lngW,
              maxLng:               lngE,
            });

            setnewSites(!divesTog ? [] : diveSiteList);
          } catch (e) {
            if (e instanceof Error) {
              console.error('Error message:', e.message);
            } else {
              console.error('Unknown error', e);
            }
          }

          try {
            let heatPointList;
            if (animalVal.length === 0) {
              heatPointList = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:               latLo,
                maxLat:               latHi,
                minLng:               lngW,
                maxLng:               lngE,
              });
            } else {
              heatPointList = await getHeatPointsWithUser({
                animalMultiSelection: animalVal,
                myCreatures:          '',
                minLat:               latLo,
                maxLat:               latHi,
                minLng:               lngW,
                maxLng:               lngE,
              });
            }
            setHeatPts(formatHeatVals(heatPointList));

            const filteredShops = await shops(boundaries);
            setnewShops(!divesTog ? [] : filteredShops);
          } catch (e) {
            if (e instanceof Error) {
              console.error('Error message:', e.message);
            } else {
              console.error('Unknown error', e);
            }
          }
        }
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

  const handleOnLoad = (map: any) => {
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
    cleanupModalsNoAnchor();
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
    if (jump && mapRef) {
      mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
      setJump(!jump);
    }
  }, [jump]);

  useEffect(() => {
    if (mapRef) {
      if (selectedDiveSite.SiteName !== '') {
        mapRef.panTo({
          lat: selectedDiveSite.Latitude,
          lng: selectedDiveSite.Longitude,
        });
        setMapZoom(16);
      }
    }
    if (selectedDiveSite.Latitude !== '') {
      setTempMarker({
        lat: selectedDiveSite.Latitude,
        lng: selectedDiveSite.Longitude,
      });
    }

    setTimeout(() => {
      setTempMarker(null);
    }, 2000);
  }, [selectedDiveSite]);

  useEffect(() => {
    if (tutorialRunning && itterator === 7) {
      setMapZoom(8);
    }
    if (tutorialRunning && (itterator2 === 2 || itterator2 === 16)) {
      setMapZoom(8);
    }

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
  }, [mapCoords, divesTog, sliderVal, animalVal]);

  const shopPoints = setupShopClusters(newShops);
  const sitePoints = setupClusters(newSites, sitesArray);
  const points = sitePoints;

  type Cluster = {
    id:         number
    type:       string
    properties: {
      category:    string
      cluster:     boolean
      siteID:      string
      point_count: number
    }
    geometry: {
      coordinates: number[]
      type:        string
    }
  };

  shopPoints.forEach((shop: Cluster) => {
    points.push(shop);
  });

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
        if (chosenModal === 'DiveSite') {
          setAddSiteVals({
            ...addSiteVals,
            Latitude:  position.lat(),
            Longitude: position.lng(),
          });
        } else if (chosenModal === 'Photos') {
          setPin({
            ...pin,
            Latitude:  position.lat(),
            Longitude: position.lng(),
          });
        }
      }
    }
  };

  const setupAnchorModal = (diveSiteName: string, lat: number, lng: number) => {
    handleMapUpdates();
    setSelectedDiveSite({
      ...selectedDiveSite,
      SiteName:  diveSiteName,
      Latitude:  lat,
      Longitude: lng,
    });
    modalShow(DiveSite, {
      size: ModalWindowSize.L,
    });
    setJump(!jump);
  };

  const setupShopModal = async (shopName: string) => {
    modalShow(ShopModal, {
      size: ModalWindowSize.L,
    });
    setSelectedShop({ id: 0, orgName: 'hello' });
    const chosenShop = await getShopByName(shopName);
    setSelectedShop(chosenShop);
    setShopModal(true);
  };

  const cleanupModals = () => {
    setTiles(true);
  };

  const cleanupModalsNoAnchor = () => {
    // setTiles(true);
  };

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
      options={options}
      onLoad={handleOnLoad}
      onCenterChanged={handleMapCenterChange}
      onZoomChanged={handleMapZoomChange}
      onBoundsChanged={handleBoundsChange}
      // disableDefaultUI={true}
      onClick={cleanupModals}
    >

      {clusters
      && clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount }
            = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + ' sites'}
              icon={anchorClust}
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
                handleMapUpdates();
              }}
            >
              <div
                style={{
                  width:           `${10 + (pointCount / points.length) * 30}px`,
                  height:          `${10 + (pointCount / points.length) * 30}px`,
                  backgroundColor: 'lightblue',
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        if (cluster.properties.category === 'Dive Site') {
          return (
            <Marker
              key={cluster.properties.siteID}
              position={{ lat: latitude, lng: longitude }}
              icon={anchorIcon}
              title={cluster.properties.siteName}
              onClick={() =>
                setupAnchorModal(
                  cluster.properties.siteName,
                  latitude,
                  longitude,
                )}
            >
            </Marker>
          );
        } else if (cluster.properties.category === 'Dive Site Selected') {
          return (
            <Marker
              key={cluster.properties.siteID}
              position={{ lat: latitude, lng: longitude }}
              icon={gold}
              title={cluster.properties.siteName}
              onClick={() =>
                setupAnchorModal(
                  cluster.properties.siteName,
                  latitude,
                  longitude,
                )}
            >
            </Marker>
          );
        } else {
          return (
            <Marker
              key={cluster.properties.siteID}
              position={{ lat: latitude, lng: longitude }}
              icon={shopClustIOS}
              title={cluster.properties.siteID}
              onClick={() =>
                setupShopModal(cluster.properties.siteID)}
            >
            </Marker>
          );
        }
      })}

      {shopPoints
      && shopPoints.map((cluster: Cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const {
          cluster: isCluster,
          point_count: pointCount,
        } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + ' shops'}
              icon={shopClustIOS}
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
                      longitude,
                      longitude,
                    ]);
                  }
                }
                handleMapUpdates();
              }}
            >
              <div
                style={{
                  width:           `${10 + (pointCount / points.length) * 10}px`,
                  height:          `${10 + (pointCount / points.length) * 10}px`,
                  backgroundColor: 'lightblue',
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }
        return (
          <Marker
            key={cluster.properties.siteID}
            position={{ lat: latitude, lng: longitude }}
            icon={shopIOS}
            title={cluster.properties.siteID}
            onClick={() =>
              setupShopModal(cluster.properties.siteID)}
          >
          </Marker>
        );
      })}

      {masterSwitch && heatpts.length > 0 && (
        <HeatmapLayer
          data={heatpts}
          options={heatOpts}
        >
        </HeatmapLayer>
      )}

      {!masterSwitch && !minorSwitch && heatpts.length > 0 && (
        <HeatmapLayer
          data={heatpts}
          options={heatOpts}
        >
        </HeatmapLayer>
      )}

      {tempMarker && <Marker position={tempMarker} icon={gold}></Marker>}

      {!masterSwitch && minorSwitch && (
        <Marker
          position={dragPin}
          draggable={true}
          icon={Manta}
          onLoad={handlePinLoad}
          onDragEnd={handleDragEnd}
        >
        </Marker>
      )}
    </GoogleMap>
  );
}
