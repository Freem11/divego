import React, { useContext, useEffect, useState } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { DiveShop } from '../../entities/diveShop';
import { DiveShopContext } from './diveShopContext';
import { getDiveShops } from '../../supabaseCalls/shopsSupabaseCalls';
import { GPSBubble } from '../../entities/GPSBubble';
import { PagedCollection } from '../../entities/pagedCollection';

export type DiveShopContextType = {
  collection:               PagedCollection<DiveShop>
  updateDiveShopCollection: (page: number, reset?: boolean) => Promise<void>

  selectedShop:    DiveShop | null
  setSelectedShop: React.Dispatch<React.SetStateAction<DiveShop | null>>
};

export const DiveShopContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapContext);
  const [collection, setCollection] = useState(new PagedCollection<DiveShop>());
  const [selectedShop, setSelectedShop] = useState<DiveShop | null>(null);


  const updateDiveShopCollection = async (_page: number, reset: boolean = false) => {
    if (boundaries) {
      // TODO: add pagination to diveshops
      setCollection(prev => ({ ...prev, isLoading: true }));
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const items = await GPSBubble.getItemsInGpsBubble(getDiveShops, bubble);

      setCollection((prev) => {
        return PagedCollection.updateItems(prev, items, reset);
      });
    }
  };

  useEffect(() => {
    if (boundaries) {
      updateDiveShopCollection(1, true);
    }
  }, [boundaries?.toString()]);

  return (
    <DiveShopContext.Provider value={{
      collection,
      updateDiveShopCollection,
      selectedShop,
      setSelectedShop,
    }}
    >
      {children}
    </DiveShopContext.Provider>
  );
};
