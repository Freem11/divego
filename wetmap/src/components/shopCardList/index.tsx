import React, { useContext } from 'react';
import style from './style.module.scss';
import { DiveShop } from '../../entities/diveShop';
import getPhotoPublicUrl from '../../helpers/getPhotoPublicUrl';
import defaultHeaderPicture from '../../images/blackManta.png';
import ShopModal from '../newModals/shopModal';
import { ModalContext } from '../reusables/modal/context';
import SidebarCard from '../reusables/sidebarCard';

type shopCardListProps = {
  shopList:              DiveShop[] | null
};

export default function ShopCardList(props: shopCardListProps) {
  const { modalShow } = useContext(ModalContext);
  if (!props.shopList) {
    return null;
  }

  const openDiveShop = (id: number) => {
    modalShow(ShopModal, {
      id:                id,
      size:              'large',
      keepPreviousModal: true,
    });
  };

  return         (
    <div className={style.shopList}>
      {props.shopList // in the future, if shopList is not empty, render a loading spinner
      && props.shopList.map((shop: any) => {
        let imageUrl = defaultHeaderPicture;
        if (shop.diveShopProfilePhoto) {
          imageUrl = getPhotoPublicUrl(shop.diveShopProfilePhoto);
        }

        return (
          <div onClick={() => openDiveShop(shop.id)} key={shop.id}>
            <SidebarCard
              title={shop.orgName}
              info={shop.diveShopBio}
              imageUrl={imageUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
