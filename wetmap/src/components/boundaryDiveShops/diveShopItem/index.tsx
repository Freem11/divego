import React from 'react';
import getPhotoPublicUrl from '../../../helpers/getPhotoPublicUrl';
import { DiveShop } from '../../../entities/diveShop';
import SidebarCard from '../../reusables/sidebarCard';

type DiveShopItemProps = {
  diveShop: DiveShop
};

export default function DiveShopItem(props: DiveShopItemProps) {
  const imageUrl = getPhotoPublicUrl(props.diveShop.diveshopprofilephoto);

  return (
    <SidebarCard
      imageUrl={imageUrl}
      title={props.diveShop.orgname}
    />
  );
}
