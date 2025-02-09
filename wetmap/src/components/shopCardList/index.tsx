import React from 'react';
import style from './style.module.scss';
import { DiveShop } from '../../entities/diveShop';
import ListItemWithImage from '../reusables/listItemWithImage';
import getPhotoPublicUrl from '../../helpers/getPhotoPublicUrl';
import defaultHeaderPicture from '../../images/blackManta.png';

type shopCardListProps = {
  shopList:              DiveShop[] | null
};

export default function ShopCardList(props: shopCardListProps) {
  if (!props.shopList) {
    return null;
  }

  return         (
    <div className={style.shopList}>
      {props.shopList // in the future, if shopList is not empty, render a loading spinner
      && props.shopList.map((shop: any) => {
        let imageUrl = defaultHeaderPicture;
        if (shop.diveShopProfilePhoto) {
          imageUrl = getPhotoPublicUrl(shop.diveShopProfilePhoto);
        }
        return (
          <ListItemWithImage
            key={shop.id}
            title={shop.orgName}
            date={shop.diveShopBio}
            imageUrl={imageUrl}
          />
        );
      })}
    </div>
  );
}
