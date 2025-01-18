import React, { useContext } from 'react';
import DiveShopItem from './diveShopItem';
import { MapBoundariesDiveShopContext } from '../contexts/mapBoundariesDiveShopContext';

export function BoundaryDiveShops() {
  const { paginator } = useContext(MapBoundariesDiveShopContext);

  if (!paginator.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!paginator.items.length) {
    return <div className="p-2">No Dive Shops in this area</div>;
  }

  return (
    <div className="p-2 scrollable">
      {paginator?.items.map((item) => {
        return (
          <div key={item.id}>
            <DiveShopItem diveShop={item} />
          </div>
        );
      })}
    </div>
  );
}
