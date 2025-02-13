import React from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { DiveShop } from '../../entities/diveShop';
import DiveShopItem from './diveShopItem';

type BoundaryDiveShopsViewProps = {
  loadMoreDiveShops:  (page: number) => void
  hasMoreDiveShops:   boolean
  isLoadingDiveShops: boolean
  diveShops:          DiveShop[] | null
  handleOpenDiveShop: (item: DiveShop) => void
};

export function BoundaryDiveShopsView(props: BoundaryDiveShopsViewProps) {
  return (
    <InfiniteScroll
      loadMore={props.loadMoreDiveShops}
      hasMore={props.hasMoreDiveShops}
      isLoading={props.isLoadingDiveShops}
    >

      {props.diveShops?.map((item) => {
        return (
          <div key={item.id} onClick={() => props.handleOpenDiveShop(item)}>
            <DiveShopItem diveShop={item} />
          </div>
        );
      })}

    </InfiniteScroll>
  );
}
