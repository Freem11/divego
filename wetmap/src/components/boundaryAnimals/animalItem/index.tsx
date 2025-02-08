import React from 'react';
import { Animal } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import ListItemWithImage from '../../reusables/listItemWithImage';

type AnimalItemProps = {
  animal:       Animal
  highlighted?: boolean
};

export function AnimalItem(props: AnimalItemProps) {
  const imageUrl = getPhotoPublicUrl(props.animal.photofile);
  if (!imageUrl) {
    return null;
  }

  return (
    <ListItemWithImage
      imageUrl={imageUrl}
      title={props.animal.label}
      date={`seen ${props.animal.times_seen} time(s)`}
      highlighted={props.highlighted}
    />
  );
}
