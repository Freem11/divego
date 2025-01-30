import React from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { PhotoItem } from './photoItem';
import DynamicSelect, { GetMoreOptions } from '../reusables/dynamicSelect';
import Icon from '../../icons/Icon';
import { Photo } from '../../entities/photos';

type BoundaryPhotosViewProps = {
  uniqueKey?:         string
  getMoreAnimals:     GetMoreOptions
  handleAnimalSelect: (e: any) => void
  loadMorePhotos:     (page: number) => void
  hasMorePhotos:      boolean
  selectedPhotos:     string[]
  isLoadingPhotos:    boolean
  photos:             Photo[] | null
};

export function BoundaryPhotosView(props: BoundaryPhotosViewProps) {
  return (
    <>
      <DynamicSelect
        labelInValue={true}
        maxSelectedOptions={2}
        placeholder="Search for an animal"
        getMoreOptions={props.getMoreAnimals}
        iconLeft={<Icon name="shark" />}
        onChange={props.handleAnimalSelect}
      />

      <InfiniteScroll
        key={props.uniqueKey}
        className="p-2 scrollable"
        loadMore={props.loadMorePhotos}
        hasMore={props.hasMorePhotos}
        isLoading={props.isLoadingPhotos}
        renderEmpty={() => <div>No photos in this area</div>}
      >
        {props.photos?.map((item) => {
          return <PhotoItem key={item.id} photo={item} highlighted={props.selectedPhotos.includes(item.label)} />;
        })}

      </InfiniteScroll>
    </>
  );
}
