import React, { createContext, useContext, useEffect, useState } from 'react';
import { getPhotosInBoundaries } from '../../helpers/boundaries/getPhotosInBoundaries';
import { MapBoundsContext } from './mapBoundariesContext';
import { PaginatedItems } from '../../entities/paginatedItems';
import { Photo } from '../../entities/photos';
import { Pagination } from '../../entities/pagination';

type MapBoundariesPhotoContextType = {
  paginator:  PaginatedItems<Photo>
  fetchItems: (reset?: boolean) => Promise<void>
};

export const MapBoundariesPhotoContext = createContext<MapBoundariesPhotoContextType>({} as MapBoundariesPhotoContextType);

const MapBoundariesPhotoContextProvider = ({ children }: any) => {
  const { boundaries } = useContext(MapBoundsContext);

  const [paginator, setPaginator] = useState<PaginatedItems<Photo>>({ items: null, pagination: new Pagination() });

  const fetchItems = async (reset: boolean = false) => {
    if (boundaries) {
      setPaginator(prev => ({ ...prev, loading: true }));
      const items = await getPhotosInBoundaries(boundaries, paginator.filter, paginator.pagination);
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

  useEffect(() => {
    (async () => {
      // fetchItems(true);
    })();
  }, [boundaries]);

  return (
    <MapBoundariesPhotoContext.Provider value={{
      paginator,
      fetchItems,
    }}
    >
      {children}
    </MapBoundariesPhotoContext.Provider>
  );
};

export default MapBoundariesPhotoContextProvider;
