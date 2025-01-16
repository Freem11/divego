import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import PhotoItem from './photoItem';
import { Pagination } from '../../entities/pagination';
import { getPhotosInBoundaries } from '../../helpers/boundaries/getPhotosInBoundaries';
import InfiniteScroll from '../reusables/infiniteScroll';
import { Photo } from '../../entities/photos';


export default function SelectedAreaPhotos() {
  const { boundaries } = useContext(MapBoundsContext);
  const ipp = 20;

  const loadMore = async (page: number) => {
    if (boundaries) {
      return await getPhotosInBoundaries(boundaries, {}, new Pagination({ page, ipp }));
    }
  };

  return (
    <div className="p-2">
      <InfiniteScroll
        key={boundaries?.toString()}
        ipp={ipp}
        loadMore={loadMore}
        renderItem={(item: Photo, index: number) => {
          return <PhotoItem key={index} photo={item} />;
        }}
        renderEmpty={() => {
          return <div>No Pictures in this area</div>;
        }}
      />
    </div>
  );
}
