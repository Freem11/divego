import { createContext } from 'react';
import { DiveShopContextType } from './diveShopContextProvider';

export const DiveShopContext = createContext<DiveShopContextType>({} as DiveShopContextType);
