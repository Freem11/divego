import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { DiveSiteWithUserName } from '../../../entities/diveSite';
import DiveSiteItemView from './view';

type DiveSiteItemProps = {
  diveSite: DiveSiteWithUserName
};

export default function DiveSiteItem(props: DiveSiteItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveSite.photo);


  return (
    <DiveSiteItemView
      imageUrl={imageUrl}
      title={props.diveSite.name}
      date={props.diveSite.divesitebio}
    />
  );
}
