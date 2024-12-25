import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import DiveShopItemView from './view';
import { DiveShop } from '../../../entities/diveShop';

type PhotoItemProps = {
  diveShop: DiveShop
};

export default function DiveShopItem(props: PhotoItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveShop.diveshopprofilephoto);
  if (!imageUrl) {
    return null;
  }

  return (
    <DiveShopItemView
      imageUrl={imageUrl}
      title={props.diveShop.orgname}
      date={props.diveShop.diveshopbio}
    />
  );
}
