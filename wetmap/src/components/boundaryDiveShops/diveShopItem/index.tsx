import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { DiveShop } from '../../../entities/diveShop';
import ListItemWithImage from '../../reusables/listItemWithImage';

type DiveShopItemProps = {
  diveShop: DiveShop
};

export default function DiveShopItem(props: DiveShopItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveShop.diveshopprofilephoto);

  return (
    <ListItemWithImage
      imageUrl={imageUrl}
      title={props.diveShop.orgname}
      date={props.diveShop.diveshopbio}
    />
  );
}
