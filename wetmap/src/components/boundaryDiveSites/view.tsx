import React from 'react';
import DiveSiteItem from './diveSiteItem';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import InfiniteScroll from '../reusables/infiniteScroll';

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
      className="p-2 scrollable"
      loadMore={props.loadMoreDiveSites}
      hasMore={props.hasMoreDiveSites}
      isLoading={props.isLoadingDiveSites}
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
