import { createContext } from 'react';
import { DiveShop } from '../../entities/diveShop';
import { PagedCollection } from '../../entities/pagedCollection';

type MapBoundariesDiveShopContextType = {
  pagedCollection:  PagedCollection<DiveShop>
  updateCollection: (reset?: boolean) => Promise<void>
};

export const MapBoundariesDiveShopContext = createContext<MapBoundariesDiveShopContextType>({} as MapBoundariesDiveShopContextType);
