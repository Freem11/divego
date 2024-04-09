import {
  GoogleMap,
  useLoadScript,
  Marker,
  HeatmapLayer,
} from "@react-google-maps/api";
import "./googleMap.css";
import useSupercluster from "use-supercluster";
import "@reach/combobox/styles.css";
import Collapse from "@mui/material/Collapse";
import anchorIcon from "../images/mapIcons/AnchorBlue1.png";
import anchorClust from "../images/mapIcons/AnchorCluster.png";
import Manta from "../images/Manta32.png";
import gold from "../images/mapIcons/AnchorGold.png";
import {
  useMemo,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import PlacesAutoComplete from "./locationSearch/placesAutocomplete";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { PinContext } from "./contexts/staticPinContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { SelectedDiveSiteContext } from "./contexts/selectedDiveSiteContext";
import { HeatPointsContext } from "./contexts/heatPointsContext";
import { MapBoundsContext } from "./contexts/mapBoundariesContext";
import { ModalSelectContext } from "./contexts/modalSelectContext";
import { DiveSpotContext } from "./contexts/diveSpotContext";
import { AnchorModalContext } from "./contexts/anchorModalContext";
import { DiveSiteAdderModalContext } from "./contexts/diveSiteAdderModalContext";
import { PicAdderModalContext } from "./contexts/picAdderModalContext";
import { SettingsModalContext } from "./contexts/settingsModalContext";
import { ProfileModalContext } from "./contexts/profileModalContext";
import { GuideLaunchModalContext } from "./contexts/guideLaunchModalContext";
import { DiveSiteSearchModalContext } from "./contexts/diveSiteSearchModalContext";
import { MapSearchModalContext } from "./contexts/mapSearchModalContext";
import { CarrouselTilesContext } from "./contexts/carrouselTilesContext";
import { IterratorContext } from "./contexts/iterratorContext";
import { Iterrator2Context } from "./contexts/iterrator2Context";
import { TutorialContext } from "./contexts/tutorialContext";
import { formatHeatVals } from "../helpers/heatPointHelpers";
import { setupClusters } from "../helpers/clusterHelpers";
import {
  diveSites,
  getDiveSitesWithUser,
} from "../supabaseCalls/diveSiteSupabaseCalls";
import {
  multiHeatPoints,
  getHeatPointsWithUser,
  getHeatPointsWithUserEmpty,
} from "../supabaseCalls/heatPointSupabaseCalls";

const LIB = ["visualization", "places"];

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIB,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map></Map>;
}

function Map() {
  const { masterSwitch } = useContext(MasterContext);
  const { pin, setPin } = useContext(PinContext);
  const { addSiteVals, setAddSiteVals } = useContext(DiveSpotContext);
  const [pinRef, setPinRef] = useState(null);
  const { mapCoords, setMapCoords } = useContext(CoordsContext);
  const { mapZoom, setMapZoom } = useContext(ZoomContext);
  const { jump, setJump } = useContext(JumpContext);
  const { divesTog } = useContext(DiveSitesContext);
  const { boundaries, setBoundaries } = useContext(MapBoundsContext);
  const { animalVal } = useContext(AnimalContext);
  const { sliderVal } = useContext(SliderContext);
  const { showGeoCoder } = useContext(GeoCoderContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext
  );
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { itterator } = useContext(IterratorContext);
  const { itterator2 } = useContext(Iterrator2Context);
  const { tutorialRunning } = useContext(TutorialContext);

  const { setSiteModal } = useContext(AnchorModalContext);
  const { setDsAddermodal } = useContext(DiveSiteAdderModalContext);
  const { setPicAddermodal } = useContext(PicAdderModalContext);
  const { setSettingsModal } = useContext(SettingsModalContext);
  const { setProfileModal } = useContext(ProfileModalContext);
  const { setGuideLaunchModal } = useContext(GuideLaunchModalContext);
  const { setDiveSiteSearchModal } = useContext(DiveSiteSearchModalContext);
  const { setMapSearchModal } = useContext(MapSearchModalContext);
  const { setTiles } = useContext(CarrouselTilesContext);

  const [newSites, setnewSites] = useState([]);
  const { chosenModal } = useContext(ModalSelectContext);
  const [mapRef, setMapRef] = useState(null);

  const [selected, setSelected] = useState(null);
  const { dragPin, setDragPin } = useContext(PinSpotContext);
  const [tempMarker, setTempMarker] = useState(false);

  let center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  let zoom = useMemo(() => mapZoom, []);

  let mapCenterTimoutHandler;
  let mapBoundariesTimoutHandler;

  const options = useMemo(() => ({
    mapTypeId: "hybrid",
    clickableIcons: false,
    maxZoom: 16,
    minZoom: 3,
    mapTypeControl: false,
    fullscreenControl: false,
    disableDefaultUI: true,
  }));

  const heatOpts = useMemo(() => ({
    opacity: 1,
    radius: 16,
  }));

  const handleMapUpdates = async () => {
    if (mapRef) {
      let boundaries = mapRef.getBounds();
      let lats = boundaries[Object.keys(boundaries)[0]];
      let lngs = boundaries[Object.keys(boundaries)[1]];

      if (boundaries) {
        if (lngs.lo > lngs.hi) {
          try {
            let AmericanDiveSites;
            let AsianDiveSites;
            AmericanDiveSites = await getDiveSitesWithUser({
              myDiveSites: "",
              minLat: lats.lo,
              maxLat: lats.hi,
              minLng: -180,
              maxLng: lngs.hi,
            });
            AsianDiveSites = await getDiveSitesWithUser({
              myDiveSites: "",
              minLat: lats.lo,
              maxLat: lats.hi,
              minLng: lngs.lo,
              maxLng: 180,
            });

            // const AmericanDiveSites = await diveSites({
            //   minLat: lats.lo,
            //   maxLat: lats.hi,
            //   minLng: -180,
            //   maxLng: lngs.hi,
            // });
            // const AsianDiveSites = await diveSites({
            //   minLat: lats.lo,
            //   maxLat: lats.hi,
            //   minLng: lngs.lo,
            //   maxLng: 180,
            // });

            let diveSiteList = [...AsianDiveSites, ...AmericanDiveSites];
            !divesTog ? setnewSites([]) : setnewSites(diveSiteList);
          } catch (e) {
            console.log({ title: "Error", message: e.message });
          }

          try {
            let AmericanHeatPoints;
            let AsianHeatPoints;
            if (animalVal.length === 0) {
              AmericanHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: -180,
                maxLng: lngs.hi,
              });
              AsianHeatPoints = await getHeatPointsWithUserEmpty({
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: lngs.lo,
                maxLng: 180,
              });
            } else {
              AmericanHeatPoints = await getHeatPointsWithUser({
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: -180,
                maxLng: lngs.hi,
                animalMultiSelection: animalVal,
              });
              AsianHeatPoints = await getHeatPointsWithUser({
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: lngs.lo,
                maxLng: 180,
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

            let heatPointList = [...AsianHeatPoints, ...AmericanHeatPoints];
            setHeatPts(formatHeatVals(heatPointList));
          } catch (e) {
            console.log({ title: "Error", message: e.message });
          }
        } else {
          try {
            const diveSiteList = await getDiveSitesWithUser({
              myDiveSites: "",
              minLat: lats.lo,
              maxLat: lats.hi,
              minLng: lngs.lo,
              maxLng: lngs.hi,
            });
            // const diveSiteList = await diveSites({
            //   minLat: lats.lo,
            //   maxLat: lats.hi,
            //   minLng: lngs.lo,
            //   maxLng: lngs.hi,
            // });

            !divesTog ? setnewSites([]) : setnewSites(diveSiteList);
          } catch (e) {
            console.log({ title: "Error", message: e.message });
          }

          try {
            let heatPointList;
            if (animalVal.length === 0) {
              heatPointList = await getHeatPointsWithUserEmpty({
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: lngs.lo,
                maxLng: lngs.hi,
              });
            } else {
              heatPointList = await getHeatPointsWithUser({
                animalMultiSelection: animalVal,
                myCreatures: "",
                minLat: lats.lo,
                maxLat: lats.hi,
                minLng: lngs.lo,
                maxLng: lngs.hi,
              });
            }
            // const heatPointList = await multiHeatPoints(
            //   {
            //     minLat: lats.lo,
            //     maxLat: lats.hi,
            //     minLng: lngs.lo,
            //     maxLng: lngs.hi,
            //   },
            //   animalVal
            // );

            setHeatPts(formatHeatVals(heatPointList));
          } catch (e) {
            console.log({ title: "Error", message: e.message });
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

  const handleOnLoad = (map) => {
    setMapRef(map);
  };

  const handleMapCenterChange = () => {
    if (mapRef) {
      window.clearTimeout(mapCenterTimoutHandler);
      mapCenterTimoutHandler = window.setTimeout(function () {
        setMapCoords([mapRef.getCenter().lat(), mapRef.getCenter().lng()]);
        handleMapUpdates();
      }, 50);
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

  const handleBoundsChange = () => {
    cleanupModalsNoAnchor();
    if (mapRef) {
      window.clearTimeout(mapBoundariesTimoutHandler);
      mapBoundariesTimoutHandler = window.setTimeout(function () {
        let boundaries = mapRef.getBounds();
        let lats = boundaries[Object.keys(boundaries)[0]];
        let lngs = boundaries[Object.keys(boundaries)[1]];
        setBoundaries([lngs.lo, lats.lo, lngs.hi, lats.hi]);
        handleMapUpdates();
      }, 50);
    }
  };

  useEffect(() => {
    if (jump) {
      mapRef.panTo({ lat: mapCoords[0], lng: mapCoords[1] });
      setJump(!jump);
    }
  }, [jump]);

  useEffect(() => {
    if (mapRef) {
      if (selectedDiveSite.SiteName !== "") {
        mapRef.panTo({
          lat: selectedDiveSite.Latitude,
          lng: selectedDiveSite.Longitude,
        });
        setMapZoom(16);
      }
    }
    if (selectedDiveSite.Latitude !== "") {
      setTempMarker({
        lat: selectedDiveSite.Latitude,
        lng: selectedDiveSite.Longitude,
      });
    }

    setTimeout(() => {
      setTempMarker(false);
    }, 2000);
  }, [selectedDiveSite]);

  useEffect(() => {
    if (tutorialRunning && itterator === 7) {
      setMapZoom(8);
    }
    if (tutorialRunning && (itterator2 === 2 || itterator2 === 16)) {
      setMapZoom(8);
    }
    handleMapUpdates();
  }, [mapCoords, divesTog, sliderVal, animalVal]);

  const points = setupClusters(newSites);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: boundaries,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 16 },
  });

  const handlePinLoad = (marker) => {
    setPinRef(marker);
  };

  const handleDragEnd = () => {
    if (chosenModal === "DiveSite") {
      setAddSiteVals({
        ...addSiteVals,
        Latitude: pinRef.getPosition().lat(),
        Longitude: pinRef.getPosition().lng(),
      });
    } else if (chosenModal === "Photos") {
      if (pinRef) {
        setPin({
          ...pin,
          Latitude: pinRef.getPosition().lat(),
          Longitude: pinRef.getPosition().lng(),
        });
      }
    }
  };

  const setupAnchorModal = (diveSiteName, lat, lng) => {
    setSelectedDiveSite({
      ...selectedDiveSite,
      SiteName: diveSiteName,
      Latitude: lat,
      Longitude: lng,
    });
    setSiteModal(true);
  };

  const cleanupModals = () => {
    setSiteModal(false);
    setDsAddermodal(false);
    setPicAddermodal(false);
    setSettingsModal(false);
    setProfileModal(false);
    setGuideLaunchModal(false);
    setDiveSiteSearchModal(false);
    setMapSearchModal(false);
    setTiles(true);
  };

  const cleanupModalsNoAnchor = () => {
    setDsAddermodal(false);
    setPicAddermodal(false);
    setSettingsModal(false);
    setProfileModal(false);
    setGuideLaunchModal(false);
    setDiveSiteSearchModal(false);
    setMapSearchModal(false);
    setTiles(true);
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
      disableDefaultUI={true}
      onClick={cleanupModals}
    >
      {masterSwitch && (
        <div className="aligner">
          <Collapse
            in={showGeoCoder}
            orientation="horizontal"
            collapsedSize="0px"
          >
            <div className="places-container">
              <PlacesAutoComplete setSelected={setSelected} />
            </div>
          </Collapse>
        </div>
      )}

      {clusters &&
        clusters.map((cluster) => {
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
                title={pointCount.toString() + " sites"}
                icon={anchorClust}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    14
                  );
                  mapRef.setZoom(expansionZoom);
                  mapRef.panTo({ lat: latitude, lng: longitude });
                  setMapCoords([
                    mapRef.getCenter().lat(),
                    mapRef.getCenter().lng(),
                  ]);
                  handleMapUpdates();
                }}
              >
                <div
                  style={{
                    width: `${10 + (pointCount / points.length) * 30}px`,
                    height: `${10 + (pointCount / points.length) * 30}px`,
                    backgroundColor: "lightblue",
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
              icon={anchorIcon}
              title={cluster.properties.siteID}
              onClick={() =>
                setupAnchorModal(cluster.properties.siteID, latitude, longitude)
              }
            ></Marker>
          );
        })}

      {masterSwitch && (
        <HeatmapLayer
          data={heatpts}
          options={heatOpts}
          opacity={1}
          radius={9}
        ></HeatmapLayer>
      )}

      {tempMarker && <Marker position={tempMarker} icon={gold}></Marker>}

      {!masterSwitch && (
        <Marker
          position={dragPin}
          draggable={true}
          icon={Manta}
          onLoad={handlePinLoad}
          onDragEnd={handleDragEnd}
        ></Marker>
      )}
    </GoogleMap>
  );
}
