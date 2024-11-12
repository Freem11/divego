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
import { GeoCoderContext } from '../contexts/geoCoderContext';
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
  const [pinRef, setPinRef] = useState<google.maps.marker.AdvancedMarkerElement | null>(null);

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
  const { showGeoCoder } = useContext(GeoCoderContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext,
  );
  const { selectedShop, setSelectedShop } = useContext(SelectedShopContext);
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { itterator } = useContext(IterratorContext);
  const { itterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning } = useContext(TutorialContext);

  const { shopModal, setShopModal } = useContext(ShopModalContext);

  const { setTiles } = useContext(CarrouselTilesContext);

  const { sitesArray, setSitesArray } = useContext(SitesArrayContext);
  const [newSites, setnewSites] = useState([]);
  const [newShops, setnewShops] = useState([]);
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
  let mapBoundariesTimoutHandler;

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
      const boundaries = mapRef.getBounds();

      if (boundaries) {
        const lats = boundaries[Object.keys(boundaries)[0]];
        const lngs = boundaries[Object.keys(boundaries)[1]];

        if (lngs.lo > lngs.hi) {
          try {
            const AmericanDiveSites = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:      lats.lo,
              maxLat:      lats.hi,
              minLng:      -180,
              maxLng:      lngs.hi,
            });
            const AsianDiveSites = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:      lats.lo,
              maxLat:      lats.hi,
              minLng:      lngs.lo,
              maxLng:      180,
            });

            const diveSiteList = [...AsianDiveSites, ...AmericanDiveSites];
            !divesTog ? setnewSites([]) : setnewSites(diveSiteList);
          } catch (e) {
            console.log({ title: 'Error', message: e.message });
          }

          try {
            let AmericanHeatPoints;
            let AsianHeatPoints;
            if (animalVal.length === 0) {
              AmericanHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:      lats.lo,
                maxLat:      lats.hi,
                minLng:      -180,
                maxLng:      lngs.hi,
              });
              AsianHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:      lats.lo,
                maxLat:      lats.hi,
                minLng:      lngs.lo,
                maxLng:      180,
              });
            } else {
              AmericanHeatPoints = await getHeatPointsWithUser({
                myCreatures:          '',
                minLat:               lats.lo,
                maxLat:               lats.hi,
                minLng:               -180,
                maxLng:               lngs.hi,
                animalMultiSelection: animalVal,
              });
              AsianHeatPoints = await getHeatPointsWithUser({
                myCreatures:          '',
                minLat:               lats.lo,
                maxLat:               lats.hi,
                minLng:               lngs.lo,
                maxLng:               180,
                animalMultiSelection: animalVal,
              });
            }
            // const AmericanHeatPoints = await multiHeatPoints(
            //   {
            //     minLat: lats.lo,
            //     maxLat: lats.hi,
            //     minLng: -180,
            //     maxLng: lngs.hi,
            //   },
            //   animalVal
            // );
            // const AsianHeatPoints = await multiHeatPoints(
            //   {
            //     minLat: lats.lo,
            //     maxLat: lats.hi,
            //     minLng: lngs.lo,
            //     maxLng: 180,
            //   },
            //   animalVal
            // );

            const heatPointList = [...AsianHeatPoints, ...AmericanHeatPoints];
            setHeatPts(formatHeatVals(heatPointList));
          } catch (e) {
            console.log({ title: 'Error', message: e.message });
          }
        } else {
          try {
            const diveSiteList = await getDiveSitesWithUser({
              myDiveSites: '',
              minLat:      lats.lo,
              maxLat:      lats.hi,
              minLng:      lngs.lo,
              maxLng:      lngs.hi,
            });
            // const diveSiteList = await diveSites({
            //   minLat: lats.lo,
            //   maxLat: lats.hi,
            //   minLng: lngs.lo,
            //   maxLng: lngs.hi,
            // });

            !divesTog ? setnewSites([]) : setnewSites(diveSiteList);
          } catch (e) {
            console.log({ title: 'Error', message: e.message });
          }

          // console.log("here", lats, lngs)
          try {
            let heatPointList;
            if (animalVal.length === 0) {
              heatPointList = await getHeatPointsWithUserEmpty({
                myCreatures: '',
                minLat:      lats.lo,
                maxLat:      lats.hi,
                minLng:      lngs.lo,
                maxLng:      lngs.hi,
              });
            } else {
              heatPointList = await getHeatPointsWithUser({
                animalMultiSelection: animalVal,
                myCreatures:          '',
                minLat:               lats.lo,
                maxLat:               lats.hi,
                minLng:               lngs.lo,
                maxLng:               lngs.hi,
              });
            }
            setHeatPts(formatHeatVals(heatPointList));

            const filteredShops = await shops(boundaries);
            !divesTog ? setnewShops([]) : setnewShops(filteredShops);
          } catch (e) {
            console.log({ title: 'Error', message: e.message });
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
        const boundaries = mapRef.getBounds();
        if (boundaries) {
          const lats = boundaries[Object.keys(boundaries)[0]];
          const lngs = boundaries[Object.keys(boundaries)[1]];
          setBoundaries([lngs.lo, lats.lo, lngs.hi, lats.hi]);
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
    type:       string
    properties: {
      category: string
      cluster:  boolean
      siteID:   string
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

  const handlePinLoad = (marker: google.maps.marker.AdvancedMarkerElement) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (pinRef) {
      const position = pinRef.position;
      if (position instanceof google.maps.LatLng) {
        console.log('huh', position instanceof google.maps.LatLng);
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
                      position.lat(),
                      position.lng(),
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
      && shopPoints.map((cluster) => {
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
              title={pointCount.toString() + ' sites'}
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
                      position.lat(),
                      position.lng(),
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
          opacity={1}
          radius={9}
        >
        </HeatmapLayer>
      )}

      {!masterSwitch && !minorSwitch && heatpts.length > 0 && (
        <HeatmapLayer
          data={heatpts}
          options={heatOpts}
          opacity={1}
          radius={9}
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
