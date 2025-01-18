import { createContext, Dispatch } from 'react';
import { Photo } from '../../entities/photos';

type MapBoundariesPhotoContextType = {
  heatPoints:         []
  selectedAnimals:    string[]
  setSelectedAnimals: Dispatch<React.SetStateAction<string[]>>
  fetchPhotos:        (page: number) => Promise<Photo[]>
  photosIpp:          number
};

export const MapBoundariesPhotoContext = createContext<MapBoundariesPhotoContextType>({} as MapBoundariesPhotoContextType);
