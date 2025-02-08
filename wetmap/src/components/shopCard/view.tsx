import React from 'react';
import style from './style.module.scss';
import { DiveShop } from '../../entities/diveShop';

type shopCardViewProps = {
  shop:     DiveShop
  openShop: (id: number) => void
};

export default function ShopCardView(props: shopCardViewProps) {
  const photoName = props.shop.diveShopProfilePhoto.split('/').pop();

  return (
    <div className={style.card} onClick={() => props.openShop(props.shop.id)}>
      <div className={style.mainContent}>
        <img src={`https://pub-c089cae46f7047e498ea7f80125058d5.r2.dev/${photoName}`} width={100}></img>
        <div className={style.subContent}>
          <p className={style.title}>{props.shop.orgName}</p>
          <div className={style.description}>
            <p className={style.text}>
              {props.shop.diveShopBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
