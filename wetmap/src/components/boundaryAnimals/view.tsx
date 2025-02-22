import React, { ChangeEvent, useState } from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { AnimalItem } from './animalItem';
import Icon from '../../icons/Icon';
import { Animal } from '../../entities/photos';
import TextInput from '../reusables/textInput';
import Chip from '../reusables/chip';
import style from './style.module.scss';
import Histogram from '../histogram';

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
  const [isHovered, setIsHovered] = useState(false);

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
            return <div>{`Can't find animals like '${props.searchAnimal}' in this area`}</div>;
          }
          return <div>No animals in this area</div>;
        }}
      >
        {props.animals?.map((item) => {
          return (
            <div key={item.photofile} onClick={() => props.handleAnimalSelect(item.label)} style={{ position: 'relative' }}>
              {props.selectedAnimals.includes(item.label) && <Histogram animal={item.label} isHovered={isHovered} />}
              <AnimalItem animal={item} highlighted={props.selectedAnimals.includes(item.label)} setIsHovered={setIsHovered} />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
