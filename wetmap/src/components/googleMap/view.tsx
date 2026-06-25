import React, { useMemo, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader, Libraries } from '@react-google-maps/api';
import style from './style.module.scss';
import anchorIconGold from '../../images/AnchorGold.png';

import { DiveSiteBasic } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import './style.css';
import { MarkerDraggable } from './marker/markerDraggable';
import { ReturnToSiteSubmitterButton } from './navigation/returnToSiteSubmitterButton';
import { ReturnToShopButton } from './navigation/returnToShopButton';
import { ReturnToCreateTripButton } from './navigation/returnToCreateTripButton';
import { MarkerDiveShop } from './marker/markerDiveShop';
import RoundButtonIcon from '../reusables/roundButton';
import Icon from '../../icons/Icon';
import { MarkerDiveSiteHalo } from './marker/markerDiveSiteHalo';

const libraries: Libraries = ['places'];

type MapViewProps = {
  googleMapApiKey:    string
  options?:           google.maps.MapOptions
  mapConfig:          number
  zoom?:              number
  center:             google.maps.LatLngLiteral
  tempMarker?:        google.maps.LatLngLiteral | null
  onLoad?:            (map: google.maps.Map) => void
  handleBoundsChange: () => void
  diveSites?:         DiveSiteBasic[] | null
  diveShops?:         DiveShop[] | null
};

export default function MapView(props: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    id:               'google-map-script',
    libraries,
    googleMapsApiKey: props.googleMapApiKey,
    version:          '3.64',
  });

  const options: google.maps.MapOptions = useMemo(() => ({
    clickableIcons:        false,
    maxZoom:               18,
    minZoom:               3,
    mapTypeControl:        false,
    fullscreenControl:     false,
    disableDefaultUI:      true,
    streetViewControl:     false,
    ...(props.options ?? {}),
  }), [props.options]);

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);

    if (typeof props.onLoad === 'function') {
      props.onLoad(map);
    }

    window.setTimeout(() => {
      props.handleBoundsChange();
    }, 0);
  };

  const zoomMapIn = () => {
    const zoom = map?.getZoom();
    if (zoom) {
      map?.setZoom(zoom + 1);
    }
  };

  const zoomMapOut = () => {
    const zoom = map?.getZoom();
    if (zoom) {
      map?.setZoom(zoom - 1);
    }
  };


  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={props.zoom || 10}
      center={props.center}
      mapContainerClassName={style.mapContainer}
      options={options}
      onLoad={onMapLoad}
      onBoundsChanged={props.handleBoundsChange}
    >

      {props.diveShops?.map((shop) => {
        if (!Number.isFinite(Number(shop.lat)) || !Number.isFinite(Number(shop.lng))) {
          return null;
        }

        return (
          <MarkerDiveShop
            key={`shop-${shop.id}`}
            id={Number(shop.id)}
            title={shop.orgname ?? shop.orgname ?? ''}
            position={{
              lat: Number(shop.lat),
              lng: Number(shop.lng),
            }}
          />
        );
      })}

      {props.diveSites?.map((site) => {
        if (!Number.isFinite(Number(site.lat)) || !Number.isFinite(Number(site.lng))) {
          return null;
        }

        return (
          <MarkerDiveSiteHalo
            key={`site-${site.id}`}
            id={Number(site.id)}
            title={site.name}
            position={{
              lat: Number(site.lat),
              lng: Number(site.lng),
            }}
            score={site.engagement_score ?? 0}
            siteNumber={site.siteNumber}
          />
        );
      })}

      {props.tempMarker && (
        <Marker position={props.tempMarker} icon={anchorIconGold} />
      )}

      {props.mapConfig === 1 && (
        <MarkerDraggable />
      )}

      {props.mapConfig !== 0 && (
        <div className={style.navButtonContainer}>
          {props.mapConfig === 1 && <ReturnToSiteSubmitterButton />}
          {props.mapConfig === 2 && <ReturnToShopButton />}
          {props.mapConfig === 3 && <ReturnToCreateTripButton />}
        </div>
      )}

      <div className={style.zoomButtonContainer}>
        <RoundButtonIcon icon={<Icon name="plus" color="blue" onClick={zoomMapIn} />} />
        <RoundButtonIcon icon={<Icon name="minus" color="blue"  onClick={zoomMapOut} />} />
      </div>
    </GoogleMap>
  );
}
