import React, { createContext, useEffect, useState } from 'react';
import { getDiveSiteData, getHeatPointData, getShopData } from '../googleMap/mapDataHelpers';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import { HeatPoint } from '../googleMap/types';
import getPhotosInTheArea from '../../helpers/getPhotosInTheArea';

type MapBoundsContextType = {
  diveSites:     DiveSiteWithUserName[] | null
  diveShops:     DiveShop[] | null
  heatPoints:    HeatPoint[] | null
  mapRef:        google.maps.Map | null
  boundaries:    google.maps.LatLngBounds | null
  setMapRef:     React.Dispatch<React.SetStateAction<google.maps.Map | null>>
  setBoundaries: React.Dispatch<React.SetStateAction<google.maps.LatLngBounds | null>>
  setAnimalVal:  React.Dispatch<React.SetStateAction<string[]>>
};

export const MapBoundsContext = createContext<MapBoundsContextType>({} as MapBoundsContextType);

const MapBoundsContextProvider = ({ children }: any) => {
  const [diveSites, setDiveSites] = useState<DiveSiteWithUserName[] | null>(null);
  const [diveShops, setDiveShops] = useState<DiveShop[] | null>(null);
  const [heatPoints, setHeatPoints] = useState<HeatPoint[] | null>(null);

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [boundaries, setBoundaries] = useState<google.maps.LatLngBounds | null>(null);
  const [animalVal, setAnimalVal] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (boundaries) {
        console.log('FETCH DIVE SITES');
        const latHi = boundaries.getNorthEast().lat();
        const latLo = boundaries.getSouthWest().lat();
        const lngE = boundaries.getNorthEast().lng();
        const lngW = boundaries.getSouthWest().lng();

        // if(divesTog) && [0, 2].includes(mapConfig) ?
        const diveSiteList = await getDiveSiteData(latHi, latLo, lngE, lngW);
        setDiveSites(diveSiteList);

        const shoplist = await getShopData(latHi, latLo, lngE, lngW);
        setDiveShops(shoplist);
      }
    })();
  }, [boundaries]);

  useEffect(() => {
    (async () => {
      if (boundaries) {
        const latHi = boundaries.getNorthEast().lat();
        const latLo = boundaries.getSouthWest().lat();
        const lngE = boundaries.getNorthEast().lng();
        const lngW = boundaries.getSouthWest().lng();

        const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);
        setHeatPoints(heatPointList);
      }
    })();
  }, [boundaries, animalVal]);

  useEffect(() => {
    (async () => {
      if (boundaries) {
        const latHi = boundaries.getNorthEast().lat();
        const latLo = boundaries.getSouthWest().lat();
        const lngE = boundaries.getNorthEast().lng();
        const lngW = boundaries.getSouthWest().lng();

        const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);
        const photos = await getPhotosInTheArea(search, boundaries[1], boundaries[3], boundaries[0], boundaries[2]);
        setPhotos(photos);
      }
    })();
  }, [boundaries, animalVal]);


  return (
    <MapBoundsContext.Provider value={{
      diveSites,
      diveShops,
      heatPoints,
      mapRef,
      boundaries,
      setMapRef,
      setBoundaries,
      setAnimalVal,
    }}
    >
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
