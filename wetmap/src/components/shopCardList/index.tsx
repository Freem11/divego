import React from 'react';
import ShopCard from '../shopCard';
import style from './style.module.scss';
import { DiveShop } from '../../entities/diveShop';

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
      && props.shopList.map((shop: any) => (
        <ShopCard
          key={shop.id}
          shop={shop}
        />
      ))}
    </div>
  );
}
