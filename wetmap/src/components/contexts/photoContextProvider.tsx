import React, { Dispatch, useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { PhotoContext } from './photoContext';
import { Pagination } from '../../entities/pagination';
import { Animal } from '../../entities/photos';
import { HeatPoint } from '../../entities/heatPoint';
import * as HeatPointsAPI from '../../supabaseCalls/heatPointSupabaseCalls';
import { GPSBubble } from '../../entities/GPSBubble';
import { getAnimalsInBubble } from '../../supabaseCalls/photoSupabaseCalls';
import { PagedCollection } from '../../entities/pagedCollection';


export type PhotoContextType = {
  heatPoints:             HeatPoint[] | null
  selectedAnimals:        string[]
  setSelectedAnimals:     Dispatch<React.SetStateAction<string[]>>
  animalCollection:       PagedCollection<Animal>
  updateAnimalCollection: (page: number, reset?: boolean) => Promise<void>
};

export const PhotoContextProvider = ({ children }: any) => {
  const { boundaries, mapConfig } = useContext(MapContext);
  const [heatPoints, setHeatPoints] = useState<HeatPoint[] | null>(null);
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
  const [animalCollection, setCollection] = useState(new PagedCollection<Animal>());

  const getHeatPoints = async () => {
    if ([1, 3].includes(mapConfig)) {
      return null;
    }
    if (boundaries) {
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const result = GPSBubble.getItemsInGpsBubble(HeatPointsAPI.getHeatPoints, bubble, { animal: selectedAnimals });
      return result;
    }
    return null;
  };

  const updateAnimalCollection = async (page: number, reset: boolean = false) => {
    if (boundaries) {
      setCollection(prev => ({ ...prev, isLoading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const pagination = new Pagination({ page, ipp: 20 });
      const items = await GPSBubble.getItemsInGpsBubble(getAnimalsInBubble, bubble, {}, pagination);
      setCollection((prev) => {
        return PagedCollection.updateItems(prev, items, reset, pagination);
      });
    }
  };

  useEffect(() => {
    (async () => {
      const heatPoints = await getHeatPoints();
      setHeatPoints(heatPoints);
    })();
  }, [boundaries?.toString(), selectedAnimals, mapConfig]);

  return (
    <PhotoContext.Provider value={{
      heatPoints,
      selectedAnimals,
      setSelectedAnimals,
      animalCollection,
      updateAnimalCollection,
    }}
    >
      {children}
    </PhotoContext.Provider>
  );
};
