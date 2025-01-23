import React from 'react';
import { Photo } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import ListItemWithImage from '../../reusables/listItemWithImage';

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
    <ListItemWithImage
      imageUrl={imageUrl}
      title={props.photo.label}
      date={props.photo.dateTaken}
      highlighted={props.highlighted}
    />
  );
}
