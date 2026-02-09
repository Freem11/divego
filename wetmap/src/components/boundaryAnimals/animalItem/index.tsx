import React from 'react';
import { Animal } from '../../../entities/photos';
import SidebarCard from '../../reusables/sidebarCard';
import { IMAGE_SIZE } from '../../../entities/image';
import getImagePublicUrl from '../../../helpers/getImagePublicUrl';

type AnimalItemProps = {
  animal:        Animal
  extraContent?: React.ReactNode
};

export function AnimalItem(props: AnimalItemProps) {
  const imageUrl = getImagePublicUrl(props.animal.image, IMAGE_SIZE.LG);
  if (!imageUrl) {
    return null;
  }

  return (
    <SidebarCard
      imageUrl={imageUrl}
      hoverHide={true}
      title={props.animal.label}
      info={`${props.animal.times_seen} Sighting${props.animal.times_seen !== 1 ? 's' : ''}`}
      extraContent={props.extraContent}
    />
  );
}
