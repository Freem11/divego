import React, { ChangeEvent } from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { AnimalItem } from './animalItem';
import Icon from '../../icons/Icon';
import { Animal } from '../../entities/photos';
import TextInput from '../reusables/textInput';
import Chip from '../reusables/chip';
import style from './style.module.scss';
import Histogram from '../histogram';
import EmptyState from '../reusables/emptyState';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <>
      <TextInput
        placeholder={t('Sidebar.searchForAnimal')}
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
          if (props.selectedAnimals.length > 0) {
            // TODO: put everything in i18n with variables
            return (
              <EmptyState
                iconName="shark"
                text={`No ${props.selectedAnimals.map((animal, index, animals) => {
                  // Convert animal name to lowercase before using it
                  const animalLower = animal.toLowerCase();

                  // Special case for exactly 2 items: just use "or" without comma
                  if (animals.length === 2) {
                    return `${animalLower}${index === 0 ? ' or ' : ''}`;  // Add " or " after first item
                  }

                  // Last item: just return the animal name with no separator
                  if (index === animals.length - 1) {
                    return animalLower;
                  }

                  // Second-to-last item: add ", or " after it
                  if (index === animals.length - 2) {
                    return `${animalLower}, or `;
                  }

                  // All other items: add ", " after them
                  return `${animalLower}, `;
                }).join('')} ${t('SideBar.inThisArea')}`}  // join("") combines all pieces into a single string
              />
            );
          }
          return  <EmptyState iconName="shark" text={t('Sidebar.seaLifeEmptyDrawer')} />;
        }}
      >
        {props.animals?.map((item) => {
          return (
            <div key={item.photofile} onClick={() => props.handleAnimalSelect(item.label)} style={{ position: 'relative' }}>
              <AnimalItem
                key={item.photofile}
                animal={item}
                extraContent={props.selectedAnimals.includes(item.label) && <Histogram animal={item.label} />}
              />
            </div>
          );
        })}

      </InfiniteScroll>
    </>
  );
}
