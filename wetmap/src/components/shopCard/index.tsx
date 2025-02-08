import React, { useContext } from 'react';
import { ModalContext } from '../reusables/modal/context';
import { DiveShop } from '../../entities/diveShop';
import ShopCardView from './view';
import ShopModal from '../newModals/shopModal';

type ShopCardProps = {
  shop:          DiveShop
};

export default function ShopCard(props: ShopCardProps) {
  const { modalShow } = useContext(ModalContext);

  const openShop = (id: number) => {
    modalShow(ShopModal, {
      keepPreviousModal: true,
      id:                id,
      size:              'large',
    });
  };

  return (
    <ShopCardView
      shop={props.shop}
      openShop={openShop}
    />
  );
}
