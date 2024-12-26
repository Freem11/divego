import React, { createContext } from 'react';
import { MapBoundsContextType } from './mapBoundariesContextProvider';

export const MapBoundsContext = createContext<MapBoundsContextType>({} as MapBoundsContextType);
