import React, { createContext, useContext, useEffect, useState } from 'react';
import { MapBoundsContext } from './mapBoundariesContext';
import { PaginatedItems } from '../../entities/paginatedItems';
import { Pagination } from '../../entities/pagination';
import { getDiveSitesInBoundaries } from '../../helpers/boundaries/getDiveSitesInBoundaries';
import { DiveSiteWithUserName } from '../../entities/diveSite';

type MapBoundariesDiveSiteContextType = {
  paginator:  PaginatedItems<DiveSiteWithUserName>
  fetchItems: (reset?: boolean) => Promise<void>
};

export const MapBoundariesDiveSiteContext = createContext<MapBoundariesDiveSiteContextType>({} as MapBoundariesDiveSiteContextType);

const MapBoundariesDiveSiteContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapBoundsContext);

  const [paginator, setPaginator] = useState<PaginatedItems<DiveSiteWithUserName>>({ items: null, pagination: new Pagination({ ipp: 10000 }) });

  const fetchItems = async (reset: boolean = false) => {
    if (boundaries) {
      setPaginator(prev => ({ ...prev, loading: true }));
      const items = await getDiveSitesInBoundaries(boundaries);
      setPaginator((prev) => {
        if (!items?.length) {
          return { ...prev, loading: false, hasMore: false };
        }

        if (prev.items === null) {
          return { ...prev, items, loading: false };
        }

        return {
          ...prev,
          loading: false,
          items:   reset ? items : [prev.items, ...items],
        };
      });
    }
  };

  return (
    <MapBoundariesDiveSiteContext.Provider value={{
      paginator,
      fetchItems,
    }}
    >
      {children}
    </MapBoundariesDiveSiteContext.Provider>
  );
};

export default MapBoundariesDiveSiteContextProvider;
