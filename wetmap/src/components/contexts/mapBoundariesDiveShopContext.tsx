import { createContext } from 'react';
import { PaginatedItems } from '../../entities/paginatedItems';
import { DiveShop } from '../../entities/diveShop';

type MapBoundariesDiveShopContextType = {
  paginator:  PaginatedItems<DiveShop>
  fetchItems: (reset?: boolean) => Promise<void>
};

export const MapBoundariesDiveShopContext = createContext<MapBoundariesDiveShopContextType>({} as MapBoundariesDiveShopContextType);
