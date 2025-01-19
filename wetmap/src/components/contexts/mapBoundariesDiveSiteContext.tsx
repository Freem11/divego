import { createContext } from 'react';

import { PagedCollection } from '../../entities/pagedCollection';

import { DiveSiteWithUserName } from '../../entities/diveSite';

type MapBoundariesDiveSiteContextType = {
  pagedCollection:  PagedCollection<DiveSiteWithUserName>
  updateCollection: (reset?: boolean) => Promise<void>
};

export const MapBoundariesDiveSiteContext = createContext<MapBoundariesDiveSiteContextType>({} as MapBoundariesDiveSiteContextType);
