import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { MapBoundariesPhotoContext } from './mapBoundariesPhotoContext';
import { getHeatPointsInBoundaries } from '../../helpers/getHeatPointsInBoundaries';
import { getPhotosInBoundaries } from '../../helpers/getPhotosInBoundaries';
import { Pagination } from '../../entities/pagination';
import { Photo } from '../../entities/photos';
import { HeatPoint } from '../../entities/heatPoint';


export type MapBoundariesPhotoContextType = {
  heatPoints:         HeatPoint[] | null
  selectedAnimals:    string[]
  setSelectedAnimals: Dispatch<React.SetStateAction<string[]>>
  getPhotos:          (page: number) => Promise<Photo[] | null>
  photosIpp:          number
};


export const MapBoundariesPhotoContextProvider = ({ children }: any) => {
  const { boundaries, mapConfig } = useContext(MapContext);
  const [heatPoints, setHeatPoints] = useState<HeatPoint[] | null>(null);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const photosIpp = 20;

  const getHeatPoints = async () => {
    if ([1, 3].includes(mapConfig)) {
      return null;
    }
    if (boundaries) {
      const heatPointList = await getHeatPointsInBoundaries(boundaries, { animal: selectedAnimals });
      return heatPointList;
    }
    return null;
  };

  const getPhotos = async (page: number) => {
    if (boundaries) {
      return await getPhotosInBoundaries(boundaries, {}, new Pagination({ page, ipp: photosIpp }));
    }
    return null;
  };

  useEffect(() => {
    (async () => {
      const heatPoints = await getHeatPoints();
      setHeatPoints(heatPoints);
    })();
  }, [boundaries?.toString(), selectedAnimals, mapConfig]);

  return (
    <MapBoundariesPhotoContext.Provider value={{
      heatPoints,
      selectedAnimals,
      setSelectedAnimals,
      getPhotos,
      photosIpp,
    }}
    >
      {children}
    </MapBoundariesPhotoContext.Provider>
  );
};
