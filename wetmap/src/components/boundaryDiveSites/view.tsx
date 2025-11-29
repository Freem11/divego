import React from 'react';
import DiveSiteItem from './diveSiteItem';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import InfiniteScroll from '../reusables/infiniteScroll';
import EmptyState from '../reusables/emptyState';
import ScreenData from '../newModals/screenData.json';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../router';

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
      renderEmpty={() => (<EmptyState iconName="anchor" text={ScreenData.Sidebar.diveSiteEmptyDrawer} />)}
    >

      {props.diveSites?.map((item) => {
        return (
          <Link to={AppRoutes.diveSite(item.id)} key={item.id}>
            <DiveSiteItem diveSite={item} />
          </Link>
        );
      })}

    </InfiniteScroll>
  );
}
