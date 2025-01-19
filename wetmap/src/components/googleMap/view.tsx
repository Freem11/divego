import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import style from './style.module.scss';
import { Cluster, HeatPoint, HeatPointConfiguration, LatLngObject, SuperclusterInstance } from './types';
import anchorIconGold from '../../images/mapIcons/AnchorGold.png';

import { setupPinConfigs } from './mapPinHelpers';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { MapWithHeatmap } from './heatmap';
import { DiveShop } from '../../entities/diveShop';
import { ModalShow } from '../reusables/modal/types';
import './style.css';
import { MarkerDraggable } from './marker/markerDraggable';
import { ReturnToSiteSubmitterButton } from './navigation/returnToSiteSubmitterButton';
import { ReturnToShopButton } from './navigation/returnToShopButton';
import { ReturnToCreateTripButton } from './navigation/returnToCreateTripButton';
import { MarkerDiveSiteCluster } from './marker/markerDiveSiteCluster';

type MapViewProps = {
  mapRef:              google.maps.Map | null
  mapConfigs:          google.maps.MapOptions
  heatpointConfigs:    HeatPointConfiguration
  mapConfig:           number
  zoom:                number
  center:              LatLngObject
  tempMarker:          LatLngObject | null
  clusters:            Cluster[]
  supercluster:        SuperclusterInstance
  heatpts:             HeatPoint[] | null
  selectedDiveSite:    DiveSiteWithUserName | null
  setSelectedDiveSite: (site: DiveSiteWithUserName) => void
  setSelectedShop:     (shop: DiveShop) => void
  onLoad:              (map: google.maps.Map) => void
  handleBoundsChange:  () => void
  modalShow:           ModalShow
};

export default function MapView(props: MapViewProps) {
  return (
    <GoogleMap
      zoom={props.zoom}
      center={props.center}
      mapContainerClassName={style.mapContainer}
      options={props.mapConfigs}
      onLoad={props.onLoad}
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
            <MarkerDiveSiteCluster
              key={cluster.id}
              cluster={cluster}
              supercluster={props.supercluster}
            />
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

      {props?.heatpts?.length && (
        <MapWithHeatmap
          mapConfig={props.mapConfig}
          map={props.mapRef}
          heatpts={props.heatpts}
          heatpointConfigs={props.heatpointConfigs}
        />
      )}

      {props.tempMarker && <Marker position={props.tempMarker} icon={anchorIconGold}></Marker>}

      {props.mapConfig === 1 && <MarkerDraggable />}


      {/* MapConfigScenarios */}
      {/* 0 = Default */}
      {/* 1 = Dive Site Add */}
      {/* 2 = View Trip/Itinerary */}
      {/* 3 = Create Trip Sites List */}
      {props.mapConfig !== 0 && (
        <div className={style.navButtonContainer}>
          {props.mapConfig === 1 && <ReturnToSiteSubmitterButton />}
          {props.mapConfig === 2 && <ReturnToShopButton />}
          {props.mapConfig === 3 && <ReturnToCreateTripButton />}
        </div>
      )}

    </GoogleMap>
  );
}
