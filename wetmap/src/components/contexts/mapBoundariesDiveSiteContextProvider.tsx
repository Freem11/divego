import React, { useContext, useState } from 'react';
import { MapBoundsContext } from './mapBoundariesContext';
import { PaginatedItems } from '../../entities/paginatedItems';
import { getDiveSitesInBoundaries } from '../../helpers/getDiveSitesInBoundaries';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { MapBoundariesDiveSiteContext } from './mapBoundariesDiveSiteContext';

const MapBoundariesDiveSiteContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapBoundsContext);
  const [paginator, setPaginator] = useState(new PaginatedItems<DiveSiteWithUserName>());

  const fetchItems = async (reset: boolean = false) => {
    if (boundaries) {
      setPaginator(prev => ({ ...prev, loading: true }));
      const items = await getDiveSitesInBoundaries(boundaries);
      setPaginator((prev) => {
        return PaginatedItems.updateItems(prev, items, reset);
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
