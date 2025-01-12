import React, { createContext, useEffect, useState } from 'react';
import { getDiveSiteData, getHeatPointData, getShopData } from '../googleMap/mapDataHelpers';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveShop } from '../../entities/diveShop';
import { HeatPoint } from '../googleMap/types';
import getPhotosInTheArea from '../../helpers/getPhotosInTheArea';
import { Photo } from '../../entities/photos';
import { getPhotosInBoundaries } from '../../helpers/boundaries/getPhotosInBoundaries';
import { Pagination } from '../../entities/pagination';
import { PaginatedItems } from '../../entities/paginatedItems';
import { getDiveSitesInBoundaries } from '../../helpers/boundaries/getDiveSitesInBoundaries';
import { MapBoundsContext } from './mapBoundariesContext';

export type MapBoundsContextType = {
  photos:              PaginatedItems<Photo>
  setPhotos:           React.Dispatch<React.SetStateAction<PaginatedItems<Photo>>>
  diveSites:           PaginatedItems<DiveSiteWithUserName>
  diveShops:           DiveShop[] | null
  heatPoints:          HeatPoint[] | null
  // photos:              Photo[] | null
  mapRef:              google.maps.Map | null
  boundaries:          google.maps.LatLngBounds
  setMapRef:           React.Dispatch<React.SetStateAction<google.maps.Map | null>>
  setBoundaries:       React.Dispatch<React.SetStateAction<google.maps.LatLngBounds>>
  setAnimalVal:        React.Dispatch<React.SetStateAction<string[]>>
  setPhotoSearchValue: React.Dispatch<React.SetStateAction<string | null>>
};

const MapBoundsContextProvider = ({ children }: any) => {
  // const [diveSites, setDiveSites] = useState<DiveSiteWithUserName[] | null>(null);
  const [diveShops, setDiveShops] = useState<DiveShop[] | null>(null);
  const [heatPoints, setHeatPoints] = useState<HeatPoint[] | null>(null);
  const [photos, setPhotos] = useState<PaginatedItems<Photo>>({ items: null, pagination: new Pagination() });
  const [diveSites, setDiveSites] = useState<PaginatedItems<DiveSiteWithUserName>>({ items: null });

  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [boundaries, setBoundaries] = useState<google.maps.LatLngBounds | null>(null);
  const [animalVal, setAnimalVal] = useState<string[]>([]);
  const [photoSearchValue, setPhotoSearchValue] = useState<string | null>(null);


  // useEffect(() => {
  //   (async () => {
  //     if (boundaries) {
  //       console.log('FETCH DIVE SITES');

  //       // if(divesTog) && [0, 2].includes(mapConfig) ?
  //       const diveSiteList = await getDiveSiteData(boundaries[0], boundaries[1], lngE, lngW);
  //       setDiveSites(diveSiteList);

  //       const shoplist = await getShopData(latHi, latLo, lngE, lngW);
  //       setDiveShops(shoplist);
  //     }
  //   })();
  // }, [boundaries]);


  // useEffect(() => {
  //   (async () => {
  //     if (boundaries) {
  //       const latHi = boundaries.getNorthEast().lat();
  //       const latLo = boundaries.getSouthWest().lat();
  //       const lngE = boundaries.getNorthEast().lng();
  //       const lngW = boundaries.getSouthWest().lng();

  //       const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);
  //       setHeatPoints(heatPointList);
  //     }
  //   })();
  // }, [boundaries, animalVal]);


  // useEffect(() => {
  //   (async () => {
  //     if (boundaries) {
  //       const items = await getPhotosInBoundaries(boundaries, photos.filter, photos.pagination);
  //       setPhotos((prev) => {
  //         return { ...prev, items: prev.items ? [prev.items, ...items] : items };
  //       });
  //     }
  //   })();
  // }, [boundaries, photos?.pagination?.page, photos.filter?.label]);

  useEffect(() => {
    (async () => {
      if (boundaries) {
        const items = await getDiveSitesInBoundaries(boundaries);
        // console.log('FETCH DIVE SITES');
        setDiveSites((prev) => {
          return { ...prev, items };
        });
      }
    })();
  }, [boundaries]);


  return (
    <MapBoundsContext.Provider value={{
      diveSites,
      diveShops,
      heatPoints,
      photos,
      setPhotos,
      mapRef,
      boundaries,
      setMapRef,
      setBoundaries,
      setAnimalVal,
      setPhotoSearchValue,
    }}
    >
      {children}
    </MapBoundsContext.Provider>
  );
};

export default MapBoundsContextProvider;
