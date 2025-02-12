import React from 'react';
import { Photo } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import SidebarCard from '../../reusables/sidebarCard';

type PhotoItemProps = {
  photo:        Photo
  highlighted?: boolean
};

export function PhotoItem(props: PhotoItemProps) {
  const imageUrl = getPhotoPublicUrl(props.photo.photoFile);
  if (!imageUrl) {
    return null;
  }

  return (
    <SidebarCard
      imageUrl={imageUrl}
      title={props.photo.label}
    />
  );
}
