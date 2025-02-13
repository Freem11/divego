import React from 'react';
import { Animal } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import SidebarCard from '../../reusables/sidebarCard';

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
    <SidebarCard
      imageUrl={imageUrl}
      hoverHide={true}
      title={props.animal.label}
      info={`${props.animal.times_seen} sighting(s)`}
    />
  );
}
