import React, { useContext, useEffect, useRef } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { PhotoContext } from '../contexts/photoContext';
import { BoundaryAnimalsView } from './view';
import useOnScreen from '../reusables/_helpers/useOnScreen';
import { debounce } from '../reusables/_helpers/debounce';


export function BoundaryAnimals() {
  const { boundaries } = useContext(MapContext);
  const { animalCollection, updateAnimalCollection, selectedAnimals, setSelectedAnimals, searchAnimal, setSearchAnimal } = useContext(PhotoContext);
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);

  useEffect(() => {
    if (isVisible) {
      updateAnimalCollection(1, true);
    }
  }, [boundaries, isVisible, searchAnimal]);

  const loadMore = (page: number) => {
    updateAnimalCollection(page);
  };

  const handleAnimalSelect = (label: string) => {
    setSelectedAnimals((prev) => {
      if (prev.includes(label)) {
        return prev.filter(item => item !== label);
      } else {
        return [...prev, label];
      }
    });
  };


  const handleAnimalSearch = debounce((search: string) => {
    setSearchAnimal(search);
  }, 200);

  return (
    <div ref={ref} className="scroll-container non-scrollable">
      <BoundaryAnimalsView
        uniqueKey={boundaries?.toString()}
        handleAnimalSearch={handleAnimalSearch}
        handleAnimalSelect={handleAnimalSelect}
        loadMoreAnimals={loadMore}
        hasMoreAnimals={!!animalCollection.hasMore}
        selectedAnimals={selectedAnimals}
        searchAnimal={searchAnimal}
        isLoadingAnimals={!!animalCollection.isLoading}
        animals={animalCollection.items}
      />
    </div>
  );
}
