import React from 'react';
import InfiniteScroll from '../reusables/infiniteScroll';
import { DiveShop } from '../../entities/diveShop';
import DiveShopItem from './diveShopItem';
import EmptyState from '../reusables/emptyState';
import { useTranslation } from 'react-i18next';

type BoundaryDiveShopsViewProps = {
  loadMoreDiveShops:  (page: number) => void
  hasMoreDiveShops:   boolean
  isLoadingDiveShops: boolean
  diveShops:          DiveShop[] | null
  handleOpenDiveShop: (item: DiveShop) => void
};

export function BoundaryDiveShopsView(props: BoundaryDiveShopsViewProps) {
  const { t } = useTranslation();
  return (
    <InfiniteScroll
      loadMore={props.loadMoreDiveShops}
      hasMore={props.hasMoreDiveShops}
      isLoading={props.isLoadingDiveShops}
      renderEmpty={() => (<EmptyState iconName="store" text={t('Sidebar.diveCenterEmptyDrawer')} />)}
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
