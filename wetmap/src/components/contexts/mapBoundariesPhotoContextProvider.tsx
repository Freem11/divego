import React, { useContext, useEffect, useState } from 'react';
import { MapBoundsContext } from './mapBoundariesContext';
import {  MapBoundariesPhotoContext } from './mapBoundariesPhotoContext';
import { getHeatPointsInBoundaries } from '../../helpers/getHeatPointsInBoundaries';
import { getPhotosInBoundaries } from '../../helpers/getPhotosInBoundaries';
import { Pagination } from '../../entities/pagination';

export const MapBoundariesPhotoContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapBoundsContext);
  const [heatPoints, setHeatPoints] = useState(null);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const photosIpp = 20;

  const fetchHeatPoints = async () => {
    if (boundaries) {
      const heatPointList = await getHeatPointsInBoundaries(boundaries, { animal: selectedAnimals });
      setHeatPoints(heatPointList);
      console.log('heat points: ', heatPointList);
    }
  };

  const fetchPhotos = async (page: number) => {
    if (boundaries) {
      return await getPhotosInBoundaries(boundaries, {}, new Pagination({ page, ipp: photosIpp }));
    }
  };

  useEffect(() => {
    fetchHeatPoints();
  }, [boundaries?.toString(), selectedAnimals]);

  return (
    <MapBoundariesPhotoContext.Provider value={{
      heatPoints,
      selectedAnimals,
      setSelectedAnimals,
      fetchPhotos,
      photosIpp,
    }}
    >
      {children}
    </MapBoundariesPhotoContext.Provider>
  );
};
