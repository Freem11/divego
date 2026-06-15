import React, { useContext, useEffect, useMemo, useState } from 'react';

import { MapContext } from './mapContext';
import { GPSBubble } from '../../entities/GPSBubble';
import { DiveSiteBasic } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import {
  getDiveSitesBasic,
  getDiveSitesByIDs,
} from '../../supabaseCalls/diveSiteSupabaseCalls';
import { getDiveShops } from '../../supabaseCalls/shopsSupabaseCalls';
import { DiveSiteContext } from '../contexts/diveSiteContext';
import { SitesArrayContext } from '../contexts/sitesArrayContext';
import { debounce } from '../reusables/_helpers/debounce';
import MapView from './view';


export default function MapLoader() {
  const mapContext = useContext(MapContext);
  const [tempMarker, setTempMarker] = useState<{ lat: number, lng: number } | null>(null);
  const { sitesArray } = useContext(SitesArrayContext);

  const [viewportSites, setViewportSites] = useState<DiveSiteBasic[]>([]);
  const [diveShops, setDiveShops] = useState<DiveShop[]>([]);
  const [fullTripSites, setFullTripSites] = useState<DiveSiteBasic[]>([]);

  const diveSiteContext = useContext(DiveSiteContext);

  const TILE_SIZE = 256;

  const getMapPixelWidth = () => {
    const div = mapContext.mapRef?.getDiv();

    return div?.offsetWidth || window.innerWidth || 1024;
  };

  const center = useMemo(() => ({
    lat: mapContext.initialPoint[0],
    lng: mapContext.initialPoint[1],
  }), [mapContext.initialPoint]);

  const handleOnLoad = (map: google.maps.Map) => {
    mapContext.setMapRef(map);
  };

  const handleBoundsChange = debounce(async () => {
    const map = mapContext.mapRef;

    if (!map) return;

    const boundaries = map.getBounds();

    if (!boundaries) return;

    mapContext.setBoundaries(boundaries);

    const northEast = boundaries.getNorthEast();
    const southWest = boundaries.getSouthWest();

    const latDelta = Math.abs(northEast.lat() - southWest.lat());
    const lngDelta = Math.abs(northEast.lng() - southWest.lng());

    if (!latDelta || !lngDelta) return;

    const padding = 0.1;

    const paddedNorthEast = {
      lat: northEast.lat() + latDelta * padding,
      lng: northEast.lng() + lngDelta * padding,
    };

    const paddedSouthWest = {
      lat: southWest.lat() - latDelta * padding,
      lng: southWest.lng() - lngDelta * padding,
    };

    const paddedGoogleBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(paddedSouthWest.lat, paddedSouthWest.lng),
      new google.maps.LatLng(paddedNorthEast.lat, paddedNorthEast.lng),
    );

    const currentBubble = GPSBubble.createFromBoundaries(paddedGoogleBounds);

    const mapPixelWidth = getMapPixelWidth();

    const calculatedZoom = Math.floor(
      Math.log2((360 * mapPixelWidth) / (lngDelta * TILE_SIZE)),
    );

    const googleZoom = map.getZoom();

    const zoom = Number.isFinite(calculatedZoom)
      ? calculatedZoom
      : Math.floor(googleZoom ?? 10);

    try {
      const [sites, shops] = await Promise.all([
        GPSBubble.getItemsInGpsBubble(getDiveSitesBasic, currentBubble, zoom),
        GPSBubble.getItemsInGpsBubble(getDiveShops, currentBubble),
      ]);

      const isTripMode = mapContext.mapConfig === 2 || mapContext.mapConfig === 3;

      if (isTripMode && fullTripSites.length > 0) {
        const viewportIds = new Set(sites.map(site => Number(site.id)));

        const tripExtras = fullTripSites.filter((site) => {
          return (
            site.lat != null
            && site.lng != null
            && !viewportIds.has(Number(site.id))
          );
        });

        setViewportSites([...sites, ...tripExtras]);
      } else {
        setViewportSites(sites);
      }

      setDiveShops(shops);
    } catch (error) {
      console.warn('Error loading map viewport data:', error);
    }
  }, 300);

  useEffect(() => {
    const selectedDiveSite = diveSiteContext.selectedDiveSite;

    if (mapContext.mapRef && selectedDiveSite?.lat && selectedDiveSite?.lng) {
      setTempMarker({
        lat: selectedDiveSite.lat,
        lng: selectedDiveSite.lng,
      });

      const timer = window.setTimeout(() => {
        setTempMarker(null);
      }, 2000);

      return () => window.clearTimeout(timer);
    }
  }, [diveSiteContext.selectedDiveSite, mapContext.mapRef]);

  useEffect(() => {
    async function hydrateTripSites() {
      if (!sitesArray || sitesArray.length === 0) {
        setFullTripSites([]);
        return;
      }

      const ids = sitesArray
        .map((site: any) => {
          return site && typeof site === 'object' ? site.id : site;
        })
        .map(Number)
        .filter(Number.isFinite);

      if (!ids.length) {
        setFullTripSites([]);
        return;
      }

      try {
        const sites = await getDiveSitesByIDs(ids);
        setFullTripSites(sites);
      } catch (error) {
        console.warn('Error hydrating trip sites:', error);
        setFullTripSites([]);
      }
    }

    hydrateTripSites();
  }, [sitesArray]);


  return (
    <MapView
      googleMapApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      mapConfig={mapContext.mapConfig}
      center={center}
      tempMarker={tempMarker}
      onLoad={handleOnLoad}
      handleBoundsChange={handleBoundsChange}
      diveSites={viewportSites}
      diveShops={diveShops}
    />
  );
}
