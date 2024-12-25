import React from 'react';
import PhotoItemView from './view';
import { Photo } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';

type PhotoItemProps = {
  photo: Photo
};

export default function PhotoItem(props: PhotoItemProps) {
  const imageUrl = getPhotoPublicUrl(props.photo.photoFile);
  if (!imageUrl) {
    return null;
  }

  return (
    <PhotoItemView
      imageUrl={imageUrl}
      title={props.photo.label}
      date={props.photo.dateTaken}
    />
  );
}
