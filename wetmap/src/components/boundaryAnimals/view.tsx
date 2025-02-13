import React from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { AnimalItem } from './animalItem';
import DynamicSelect, { GetMoreOptions } from '../reusables/dynamicSelect';
import Icon from '../../icons/Icon';
import { Animal } from '../../entities/photos';

type BoundaryAnimalsViewProps = {
  uniqueKey?:         string
  getMoreAnimals:     GetMoreOptions
  handleAnimalSelect: (e: any) => void
  loadMoreAnimals:    (page: number) => void
  hasMoreAnimals:     boolean
  selectedAnimals:    string[]
  isLoadingAnimals:   boolean
  animals:            Animal[] | null
};

export function BoundaryAnimalsView(props: BoundaryAnimalsViewProps) {
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
        loadMore={props.loadMoreAnimals}
        hasMore={props.hasMoreAnimals}
        isLoading={props.isLoadingAnimals}
        renderEmpty={() => <div>No animals in this area</div>}
      >
        {props.animals?.map((item) => {
          return <AnimalItem key={item.photofile} animal={item} highlighted={props.selectedAnimals.includes(item.label)} />;
        })}

      </InfiniteScroll>
    </>
  );
}
