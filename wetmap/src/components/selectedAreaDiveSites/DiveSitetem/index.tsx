import React from 'react';
import { Photo } from '../../../entities/photos';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import DiveShopItemView from './view';
import { DiveSiteWithUserName } from '../../../entities/diveSite';

type DiveSiteItemProps = {
  diveSite: DiveSiteWithUserName
};

export default function DiveSiteItem(props: DiveSiteItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveSite.photo);
  // if (!imageUrl) {
  //   return null;
  // }

  return (
    <DiveShopItemView
      // imageUrl={imageUrl}
      title={props.diveSite.name}
      date={props.diveSite.divesitebio}
    />
  );
}
