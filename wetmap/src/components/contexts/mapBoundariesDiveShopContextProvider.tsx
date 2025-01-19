import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { DiveShop } from '../../entities/diveShop';
import { MapBoundariesDiveShopContext } from './mapBoundariesDiveShopContext';
import { getDiveShops } from '../../supabaseCalls/shopsSupabaseCalls';
import { GPSBubble } from '../../entities/GPSBubble';
import { PagedCollection } from '../../entities/pagedCollection';

const MapBoundariesDiveShopContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapContext);
  const [pagedCollection, setPagedCollection] = useState(new PagedCollection<DiveShop>());


  const updateCollection = async (reset: boolean = false) => {
    if (boundaries) {
      setPagedCollection(prev => ({ ...prev, loading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const items = await getDiveShops(bubble);
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
    <MapBoundariesDiveShopContext.Provider value={{
      pagedCollection,
      updateCollection,
    }}
    >
      {children}
    </MapBoundariesDiveShopContext.Provider>
  );
};

export default MapBoundariesDiveShopContextProvider;
