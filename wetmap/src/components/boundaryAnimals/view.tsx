import React, { ChangeEvent } from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { AnimalItem } from './animalItem';
import Icon from '../../icons/Icon';
import { Animal } from '../../entities/photos';
import TextInput from '../reusables/textInput';
import Chip from '../reusables/chip';
import style from './style.module.scss';
import EmptyState from '../reusables/emptyState';

type BoundaryAnimalsViewProps = {
  uniqueKey?:         string
  handleAnimalSearch: (search: string) => void
  handleAnimalSelect: (label: string) => void
  loadMoreAnimals:    (page: number) => void
  hasMoreAnimals:     boolean
  selectedAnimals:    string[]
  searchAnimal:       string
  isLoadingAnimals:   boolean
  animals:            Animal[] | null
};

export function BoundaryAnimalsView(props: BoundaryAnimalsViewProps) {
  return (
    <>
      <TextInput
        placeholder="Search for an animal"
        iconLeft={<Icon name="shark" />}
        onChange={(event: ChangeEvent<HTMLInputElement>) => props.handleAnimalSearch(event.target.value)}
      />

      {props.selectedAnimals.length > 0 && (
        <div className={style.chipContainer}>
          {props.selectedAnimals.map(item => (
            <Chip key={item} unselect={() => props.handleAnimalSelect(item)}>{item}</Chip>
          ))}
        </div>
      )}

      <InfiniteScroll
        key={props.uniqueKey}
        loadMore={props.loadMoreAnimals}
        hasMore={props.hasMoreAnimals}
        isLoading={props.isLoadingAnimals}
        renderEmpty={() => {
          if (props.searchAnimal) {
            return <EmptyState iconName="shark" text={`No "${props.searchAnimal}" in this area.`} />;
          }
          return  <EmptyState iconName="shark" text="No sea life in this area." />;
        }}
      >
        {props.animals?.map((item) => {
          return (
            <div key={item.photofile} onClick={() => props.handleAnimalSelect(item.label)}>
              <AnimalItem animal={item} highlighted={props.selectedAnimals.includes(item.label)} />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
