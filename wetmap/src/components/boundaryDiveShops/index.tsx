import React, { useContext, useEffect } from 'react';
import { DiveShopContext } from '../contexts/diveShopContext';
import { DiveShop } from '../../entities/diveShop';
import { ModalContext } from '../reusables/modal/context';
import ShopModal from '../newModals/shopModal';
import { MapContext } from '../googleMap/mapContext';
import { BoundaryDiveShopsView } from './view';

export function BoundaryDiveShops() {
  const { collection, setSelectedShop } = useContext(DiveShopContext);
  const { modalShow } = useContext(ModalContext);
  const { boundaries } = useContext(MapContext);

  useEffect(() => {
    // TODO: doesnt make sense until pagination is added
    // updateDiveShopCollection(1, true);
  }, [boundaries]);

  const loadMore = () => {
    // TODO: doesnt make sense until pagination is added
  //   updateDiveShopCollection(page);
  };


  const handleOpenDiveShop = (item: DiveShop) => {
    setSelectedShop(item);
    modalShow(ShopModal, {
      panTo: true,
      size:  'large',
      id:    item.id,
    });
  };

  return (
    <BoundaryDiveShopsView
      key={boundaries?.toString()}
      diveShops={collection.items}
      handleOpenDiveShop={handleOpenDiveShop}
      hasMoreDiveShops={collection.hasMore}
      isLoadingDiveShops={collection.isLoading}
      loadMoreDiveShops={loadMore}
    />
  );
}
