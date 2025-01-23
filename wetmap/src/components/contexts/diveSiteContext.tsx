import { createContext } from 'react';
import { DiveSiteContextType } from './diveSiteContextProvider';

export const DiveSiteContext = createContext<DiveSiteContextType>({} as DiveSiteContextType);
