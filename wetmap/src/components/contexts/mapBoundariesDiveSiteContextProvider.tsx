import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { PagedCollection } from '../../entities/pagedCollection';
import { getDiveSitesInBoundaries } from '../../helpers/getDiveSitesInBoundaries';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { MapBoundariesDiveSiteContext } from './mapBoundariesDiveSiteContext';

const MapBoundariesDiveSiteContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapContext);
  const [pagedCollection, setPagedCollection] = useState(new PagedCollection<DiveSiteWithUserName>());

  const updateCollection = async (reset: boolean = false) => {
    if (boundaries) {
      setPagedCollection(prev => ({ ...prev, loading: true }));
      const items = await getDiveSitesInBoundaries(boundaries);
      setPagedCollection((prev) => {
        return PagedCollection.updateItems(prev, items, reset);
      });
    }
  };

  useEffect(() => {
    if (boundaries) {
      updateCollection(true);
    }
  }, [boundaries?.toString()]);

  return (
    <MapBoundariesDiveSiteContext.Provider value={{
      pagedCollection,
      updateCollection,
    }}
    >
      {children}
    </MapBoundariesDiveSiteContext.Provider>
  );
};

export default MapBoundariesDiveSiteContextProvider;
