import React, { useContext } from 'react';
import DiveShopItem from './diveShopItem';
import { MapBoundariesDiveShopContext } from '../contexts/mapBoundariesDiveShopContext';
import { DiveShop } from '../../entities/diveShop';
import { ModalContext } from '../reusables/modal/context';
import ShopModal from '../newModals/shopModal';
import { SelectedShopContext } from '../contexts/selectedShopContext';

export function BoundaryDiveShops() {
  const { pagedCollection } = useContext(MapBoundariesDiveShopContext);
  const { modalShow } = useContext(ModalContext);
  const { setSelectedShop } = useContext(SelectedShopContext);

  if (!pagedCollection.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!pagedCollection.items.length) {
    return <div className="p-2">No Dive Shops in this area</div>;
  }

  const openModal = (item: DiveShop) => {
    setSelectedShop(item);
    modalShow(ShopModal, {
      size:   'large',
      panTo: true,
      id:     item.id,
    });
  };

  return (
    <div className="p-2 scrollable">
      {pagedCollection?.items.map((item: DiveShop) => {
        return (
          <div key={item.id} onClick={() => openModal(item)}>
            <DiveShopItem diveShop={item} />
          </div>
        );
      })}
    </div>
  );
}
