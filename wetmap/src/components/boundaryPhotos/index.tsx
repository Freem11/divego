import React, { useContext, useEffect, useRef } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { DynamicSelectOptionsAnimals } from '../../entities/DynamicSelectOptionsAnimals';
import { PhotoContext } from '../contexts/photoContext';
import { Option } from '../reusables/select';
import { BoundaryPhotosView } from './view';
import useOnScreen from '../reusables/_helpers/useOnScreen';


export function BoundaryPhotos() {
  const { boundaries } = useContext(MapContext);
  const { collection, updatePhotoCollection, selectedAnimals, setSelectedAnimals } = useContext(PhotoContext);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      updatePhotoCollection(1, true);
    }
  }, [boundaries, isVisible]);

  const loadMore = (page: number) => {
    updatePhotoCollection(page);
  };

  const handleAnimalSelect = (e: any) => {
    setSelectedAnimals(() => {
      if (Array.isArray(e?.target?.value)) {
        return e.target.value.map((option: Option) => option.label);
      } else {
        return [];
      }
    });
  };

  return (
    <div ref={ref} className="scroll-container non-scrollable">
      <BoundaryPhotosView
        uniqueKey={boundaries?.toString()}
        getMoreAnimals={DynamicSelectOptionsAnimals.getMoreOptions}
        handleAnimalSelect={handleAnimalSelect}
        loadMorePhotos={loadMore}
        hasMorePhotos={!!collection.hasMore}
        selectedPhotos={selectedAnimals}
        isLoadingPhotos={!!collection.isLoading}
        photos={collection.items}
      />
    </div>
  );
}
