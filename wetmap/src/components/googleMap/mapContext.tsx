import { createContext } from 'react';
import { MapContextType } from './mapContextProvider';

export const MapContext = createContext<MapContextType>({} as MapContextType);
