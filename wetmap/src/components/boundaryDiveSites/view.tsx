import React from 'react';
import DiveSiteItem from './diveSiteItem';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import InfiniteScroll from '../reusables/infiniteScroll';
import EmptyState from '../reusables/emptyState';
import ScreenData from '../newModals/screenData.json';

type BoundaryDiveSitesViewProps = {
  uniqueKey?:         string
  loadMoreDiveSites:  (page: number) => void
  hasMoreDiveSites:   boolean
  isLoadingDiveSites: boolean
  diveSites:          DiveSiteWithUserName[] | null
  handleOpenDiveSite: (item: DiveSiteWithUserName) => void
};

export function BoundaryDiveSitesView(props: BoundaryDiveSitesViewProps) {
  return (
    <InfiniteScroll
      key={props.uniqueKey}
      loadMore={props.loadMoreDiveSites}
      hasMore={props.hasMoreDiveSites}
      isLoading={props.isLoadingDiveSites}
      renderEmpty={() => (<EmptyState iconName="anchor" text={ScreenData.Sidebar.diveCenterEmptyDrawer} />)}
    >

      {props.diveSites?.map((item) => {
        return (
          <div key={item.id} onClick={() => props.handleOpenDiveSite(item)}>
            <DiveSiteItem diveSite={item} />
          </div>
        );
      })}

    </InfiniteScroll>
  );
}
