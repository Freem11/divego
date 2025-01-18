import { createContext } from 'react';

import { PaginatedItems } from '../../entities/paginatedItems';

import { DiveSiteWithUserName } from '../../entities/diveSite';

type MapBoundariesDiveSiteContextType = {
  paginator:  PaginatedItems<DiveSiteWithUserName>
  fetchItems: (reset?: boolean) => Promise<void>
};

export const MapBoundariesDiveSiteContext = createContext<MapBoundariesDiveSiteContextType>({} as MapBoundariesDiveSiteContextType);
