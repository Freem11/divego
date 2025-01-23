import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { PagedCollection } from '../../entities/pagedCollection';
import { DiveSiteBasic, DiveSiteWithUserName } from '../../entities/diveSite';
import { DiveSiteContext } from './diveSiteContext';
import { GPSBubble } from '../../entities/GPSBubble';
import { getDiveSitesBasic, getDiveSitesWithUser } from '../../supabaseCalls/diveSiteSupabaseCalls';
import { Pagination } from '../../entities/pagination';

export type DiveSiteContextType = {
  // all dive sites without pagination with minimum info just to render it on the map
  basicCollection:  PagedCollection<DiveSiteBasic>

  // paginated dive site list with full info
  // It's different from basicCollection because probably we will need different sources of data:
  // - for rendering it on the map - we cant just fetch all divesites without any limit(supabase limit is 1000) so not all of them will be rendered on the map
  // - for rendering it in the list - we might need more columns, maybe joined with other tables
  collection:               PagedCollection<DiveSiteWithUserName>
  updateDiveSiteCollection: (page: number, reset?: boolean) => Promise<void>

  selectedDiveSite:    DiveSiteWithUserName | null
  setSelectedDiveSite: React.Dispatch<React.SetStateAction<DiveSiteWithUserName | null>>
};

export const DiveSiteContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapContext);
  const [basicCollection, setBasicCollection] = useState(new PagedCollection<DiveSiteBasic>());
  const [collection, setCollection] = useState(new PagedCollection<DiveSiteWithUserName>());
  const [selectedDiveSite, setSelectedDiveSite] = useState<DiveSiteWithUserName | null>(null);

  const updateDiveSiteBasicCollection = async (reset: boolean = false) => {
    if (boundaries) {
      setBasicCollection(prev => ({ ...prev, isLoading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const items = await GPSBubble.getItemsInGpsBubble(getDiveSitesBasic, bubble);
      setBasicCollection((prev) => {
        return PagedCollection.updateItems(prev, items, reset);
      });
    }
  };

  const updateDiveSiteCollection = async (page: number, reset: boolean = false) => {
    if (boundaries) {
      setCollection(prev => ({ ...prev, isLoading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const pagination = new Pagination({ page, ipp: 20 });
      const items = await GPSBubble.getItemsInGpsBubble(getDiveSitesWithUser, bubble, {}, pagination);
      setCollection((prev) => {
        return PagedCollection.updateItems(prev, items, reset, pagination);
      });
    }
  };

  useEffect(() => {
    if (boundaries) {
      updateDiveSiteBasicCollection(true);
    }
  }, [boundaries?.toString()]);

  return (
    <DiveSiteContext.Provider value={{
      basicCollection,
      collection,
      updateDiveSiteCollection,
      selectedDiveSite,
      setSelectedDiveSite,
    }}
    >
      {children}
    </DiveSiteContext.Provider>
  );
};
