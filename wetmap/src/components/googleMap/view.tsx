import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import style from './style.module.scss';
import { Cluster, HeatPoint, HeatPointConfiguration, LatLngObject, MapConfiguration, SuperclusterInstance } from './types';
import anchorClusterIcon from '../../images/mapIcons/AnchorCluster.png';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';
import mantaIcon from '../../images/Manta32.png';
import { setupPinConfigs } from './mapPinHelpers';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { MapWithHeatmap } from './heatmap';
import { DiveShop } from '../../entities/diveShop';
import { ModalShow } from '../reusables/modal/types';
import './style.css';
import RoundButtonIcon from '../reusables/roundButton';
import Icon from '../../icons/Icon';
import Button from '../newModals/button';
import screenData from '../newModals/screenData.json';

type MapViewProps = {
  mapRef:                google.maps.Map | null
  mapConfigs:            MapConfiguration
  heatpointConfigs:      HeatPointConfiguration
  mapConfig:             number
  setMapConfig:          (configType: number) => void
  returnToSiteSubmitterModal:      () => void
  returnToShopModal:     () => void
  zoom:                  number
  center:                LatLngObject
  tempMarker:            LatLngObject | null
  animalVal:             string[]
  clusters:              Cluster[]
  supercluster:          SuperclusterInstance
  divesTog:              boolean
  heatpts:               HeatPoint[]
  mapCoords:             number[]
  setMapCoords:          (coords: number[]) => void
  selectedDiveSite:      DiveSiteWithUserName | null
  setSelectedDiveSite:   (site: DiveSiteWithUserName) => void
  setSelectedShop:       (shop: DiveShop) => void
  onLoad:                (map: google.maps.Map) => void
  handleMapUpdates:      () => void
  handleBoundsChange:    () => void
  handleMapCenterChange: () => void
  handleMapZoomChange:   () => void
  zoomMapIn:             () => void
  zoomMapOut:            () => void
  dragPin:               LatLngObject
  handlePinLoad:         (marker: google.maps.Marker) => void
  handleDragEnd:         () => void
  modalShow:             ModalShow
};

export default function MapView(props: MapViewProps) {
  return (
    <GoogleMap
      zoom={props.zoom}
      center={props.center}
      mapContainerClassName={style.mapContainer}
      options={props.mapConfigs}
      onLoad={props.onLoad}
      onCenterChanged={props.handleMapCenterChange}
      onZoomChanged={props.handleMapZoomChange}
      onBoundsChanged={props.handleBoundsChange}
    >

      {props.clusters
      && props.clusters.map((cluster) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount }
            = cluster.properties;
        const { iconType, modalSetup }
            = setupPinConfigs(
              cluster.properties,
              props.modalShow,
              props.setSelectedDiveSite,
              props.setSelectedShop);

        if (isCluster && pointCount) {
          return (
            <Marker
              key={cluster.id}
              position={{ lat: latitude, lng: longitude }}
              title={pointCount.toString() + ' locations'}
              icon={anchorClusterIcon}
              onClick={() => {
                const expansionZoom = Math.min(
                  props.supercluster.getClusterExpansionZoom(cluster.id),
                  14,
                );
                if (props.mapRef) {
                  const position = props.mapRef.getCenter();
                  if (position) {
                    props.mapRef.setZoom(expansionZoom);
                    props.mapRef.panTo({ lat: latitude, lng: longitude });
                    props.setMapCoords([
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

      {([0, 2].includes(props.mapConfig)) && (props.heatpts.length > 0) && (
        <MapWithHeatmap
          mapConfig={props.mapConfig}
          map={props.mapRef}
          heatpts={props.heatpts}
          heatpointConfigs={props.heatpointConfigs}
        />
      )}

      {props.tempMarker && <Marker position={props.tempMarker} icon={anchorIconGold}></Marker>}

      {props.mapConfig === 1
        ? (
            <Marker
              position={props.dragPin}
              draggable={true}
              icon={mantaIcon}
              onLoad={props.handlePinLoad}
              onDragEnd={props.handleDragEnd}
            >
            </Marker>
          )
        : null}

      <div className={style.zoomButtonContainer}>
          <RoundButtonIcon icon={<Icon name="plus" color='blue' onClick={props.zoomMapIn}/>}/>
          <RoundButtonIcon icon={<Icon name="minus" color='blue'  onClick={props.zoomMapOut}/>}/>
      </div>

{/* MapConfigScenarios */}
{/* 0 = Default */}
{/* 1 = Dive Site Add */}
{/* 2 = View Trip/Itinerary */}
{/* 3 = Create Trip Sites List */}

{[1,2,3].includes(props.mapConfig) && (
     <div className={style.navButtonContainer}> 
     <Button
       className="btn-md bg-primary"
       type="button"
       onClick={
        props.mapConfig === 1 ? props.returnToSiteSubmitterModal :
        props.mapConfig === 2 ? props.returnToShopModal : null
       }
     >
       {
       props.mapConfig == 1 ? screenData.GoogleMap.pinButton :
       props.mapConfig == 2 ? screenData.GoogleMap.shopButton : 
       props.mapConfig == 3 ? screenData.GoogleMap.sitesButton : null
       }
     </Button>
   </div>
)};

   

    </GoogleMap>
  );
}
