import React, { useContext } from 'react';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { Pagination } from '../../entities/pagination';
import InfiniteScroll from '../reusables/infiniteScroll';
import { Photo } from '../../entities/photos';
import { getPhotosInBoundaries } from '../../helpers/getPhotosInBoundaries';
import { PhotoItem } from './photoItem';
import DynamicSelect from '../reusables/dynamicSelect';
import { DynamicSelectOptionsAnimals } from '../../entities/DynamicSelectOptionsAnimals';
import Icon from '../../icons/Icon';
import { MapBoundariesPhotoContext } from '../contexts/mapBoundariesPhotoContext';
import { Option } from '../reusables/select';


export function BoundaryPhotos() {
  const { boundaries } = useContext(MapBoundsContext);
  const { photosIpp, fetchPhotos, selectedAnimals, setSelectedAnimals } = useContext(MapBoundariesPhotoContext);

  const loadMore = async (page: number) => {
    return await fetchPhotos(page);
  };

  const onChange = (e: any) => {
    setSelectedAnimals(() => {
      if (Array.isArray(e?.target?.value)) {
        return e.target.value.map((option: Option) => option.label);
      } else {
        return [];
      }
    });
  };

  return (
    <>
      <DynamicSelect
        labelInValue={true}
        maxSelectedOptions={2}
        placeholder="Search for an animal"
        getMoreOptions={DynamicSelectOptionsAnimals.getMoreOptions}
        iconLeft={<Icon name="shark" />}
        onChange={onChange}
      />
      <InfiniteScroll
        key={boundaries?.toString()}
        ipp={photosIpp}
        className="p-2 scrollable"
        loadMore={loadMore}
        renderItem={(item: Photo, index: number) => {
          return <PhotoItem key={index} photo={item} highlighted={selectedAnimals.includes(item.label)} />;
        }}
        renderEmpty={() => {
          return <div>No Pictures in this area</div>;
        }}
      />
    </>
  );
}
