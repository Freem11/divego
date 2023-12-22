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
import { diveSitesFake, heatVals } from "./data/testdata";
import anchorIcon from "../images/anchor11.png";
import anchorClust from "../images/anchor3.png";
import Manta from "../images/Manta32.png";
import gold from "../images/icons8-anchor-24.png";
import {
  useMemo,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { animated, useSpring } from "react-spring";
import PlacesAutoComplete from "./locationSearch/placesAutocomplete";
import { CoordsContext } from "./contexts/mapCoordsContext";
import { ZoomContext } from "./contexts/mapZoomContext";
import { JumpContext } from "./contexts/jumpContext";
import { DiveSitesContext } from "./contexts/diveSitesContext";
import { SliderContext } from "./contexts/sliderContext";
import { AnimalContext } from "./contexts/animalContext";
import { AnimalMultiSelectContext } from "./contexts/animalMultiSelectContext";
import { GeoCoderContext } from "./contexts/geoCoderContext";
import { PinContext } from "./contexts/staticPinContext";
import { MasterContext } from "./contexts/masterContext";
import { PinSpotContext } from "./contexts/pinSpotContext";
import { SelectedDiveSiteContext } from "./contexts/selectedDiveSiteContext";
import { LightBoxContext } from "./contexts/lightBoxContext";
import { SelectedPicContext } from "./contexts/selectPicContext";
import { HeatPointsContext } from "./contexts/heatPointsContext";
import { MapBoundsContext } from "./contexts/mapBoundariesContext";
import { ModalSelectContext } from "./contexts/modalSelectContext";
import { DiveSpotContext } from "./contexts/diveSpotContext";
import { AnchorModalContext } from "./contexts/anchorModalContext";
import { IterratorContext } from "./contexts/iterratorContext";
import { TutorialContext } from "./contexts/tutorialContext";
import { newGPSBoundaries } from "../helpers/mapHelpers";
import { formatHeatVals } from "../helpers/heatPointHelpers";
import { setupClusters } from "../helpers/clusterHelpers";
// import { diveSites } from "../axiosCalls/diveSiteAxiosCalls";
import { diveSites } from "../supabaseCalls/diveSiteSupabaseCalls";
// import { heatPoints } from "../axiosCalls/heatPointAxiosCalls";
import {
  heatPoints,
  multiHeatPoints,
  picClickheatPoints,
} from "../supabaseCalls/heatPointSupabaseCalls";
import Lightbox from "react-image-lightbox";
import zIndex from "@mui/material/styles/zIndex";

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
  const { animalMultiSelection } = useContext(AnimalMultiSelectContext);
  const { sliderVal } = useContext(SliderContext);
  const { showGeoCoder, setShowGeoCoder } = useContext(GeoCoderContext);
  const { selectedDiveSite, setSelectedDiveSite } = useContext(
    SelectedDiveSiteContext
  );
  const { heatpts, setHeatPts } = useContext(HeatPointsContext);

  const { itterator, setItterator } = useContext(IterratorContext);
  const { tutorialRunning, setTutorialRunning } = useContext(TutorialContext);

  const { siteModal, setSiteModal } = useContext(AnchorModalContext);
  const { lightbox, setLightbox } = useContext(LightBoxContext);
  const { selectedPic } = useContext(SelectedPicContext);

  const [newSites, setnewSites] = useState([]);
  const { chosenModal, setChosenModal } = useContext(ModalSelectContext);
  const [mapRef, setMapRef] = useState(null);

  const [selected, setSelected] = useState(null);
  const { dragPin, setDragPin } = useContext(PinSpotContext);
  const [tempMarker, setTempMarker] = useState(false);

  const toggleSiteModal = () => {
    setSiteModal(!siteModal);
  };

  let center = useMemo(() => ({ lat: mapCoords[0], lng: mapCoords[1] }), []);
  let zoom = useMemo(() => mapZoom, []);

  let mapCenterTimoutHandler;
  let mapBoundariesTimoutHandler;

  const options = useMemo(() => ({
    mapTypeId: "satellite",
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
    let GPSBubble = newGPSBoundaries(mapZoom, mapCoords[0], mapCoords[1]);

    let filteredDiveSites = await diveSites(GPSBubble);
    !divesTog ? setnewSites([]) : setnewSites(filteredDiveSites);

    let filteredHeatPoints = await multiHeatPoints(GPSBubble, animalVal);

    // let filteredHeatPoints = await multiHeatPoints(
    //   GPSBubble,
    //   sliderVal,
    //   animalMultiSelection
    // );
    setHeatPts(formatHeatVals(filteredHeatPoints));
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
      mapRef.panTo({
        lat: selectedDiveSite.Latitude,
        lng: selectedDiveSite.Longitude,
      });
      setMapZoom(16);
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

  useEffect(async () => {
    if (tutorialRunning && itterator === 7){
      setMapZoom(8)
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
      SiteName: diveSiteName,
      Latitude: lat,
      Longitude: lng,
    });
    setSiteModal(!siteModal);
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
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

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

    
      {/* 
      {lightbox && (
        <div className="boxLight">
          <Lightbox
            mainSrc={selectedPic}
            onCloseRequest={() => setLightbox(false)}
          />
          </div>
        )} */}
    </GoogleMap>
  );
}
