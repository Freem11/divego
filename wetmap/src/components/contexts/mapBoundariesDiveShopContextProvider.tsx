import React, { useContext, useState } from 'react';
import { MapBoundsContext } from './mapBoundariesContext';
import { PaginatedItems } from '../../entities/paginatedItems';
import { DiveShop } from '../../entities/diveShop';
import { MapBoundariesDiveShopContext } from './mapBoundariesDiveShopContext';
import { getDiveShops } from '../../supabaseCalls/shopsSupabaseCalls';
import { GPSBubble } from '../../entities/GPSBubble';

const MapBoundariesDiveShopContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapBoundsContext);
  const [paginator, setPaginator] = useState(new PaginatedItems<DiveShop>());


  const fetchItems = async (reset: boolean = false) => {
    if (boundaries) {
      setPaginator(prev => ({ ...prev, loading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const items = await getDiveShops(bubble);
      setPaginator((prev) => {
        return PaginatedItems.updateItems(prev, items, reset);
      });
    }
  };

  return (
    <MapBoundariesDiveShopContext.Provider value={{
      paginator,
      fetchItems,
    }}
    >
      {children}
    </MapBoundariesDiveShopContext.Provider>
  );
};

export default MapBoundariesDiveShopContextProvider;
