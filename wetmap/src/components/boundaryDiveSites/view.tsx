import React, { useState } from 'react';
import DiveSiteItem from './diveSiteItem';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import InfiniteScroll from '../reusables/infiniteScroll';
import EmptyState from '../reusables/emptyState';
import ScreenData from '../newModals/screenData.json';
import style from './style.module.scss';
import Icon from '../../icons/Icon';

type BoundaryDiveSitesViewProps = {
  uniqueKey?:         string;
  loadMoreDiveSites:  (page: number) => void;
  hasMoreDiveSites:   boolean;
  isLoadingDiveSites: boolean;
  diveSites:          DiveSiteWithUserName[] | null;
  handleOpenDiveSite: (item: DiveSiteWithUserName) => void;
};

// Extracted Region Accordion component for better state management per group
function RegionAccordion({ region, items, handleOpen }: { region: string, items: DiveSiteWithUserName[], handleOpen: (item: DiveSiteWithUserName) => void }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={style.regionGroup}>
      <div className={style.regionHeader} onClick={() => setIsOpen(!isOpen)}>
        <h4 className={style.regionTitle}>{region || 'Unknown Location'}</h4>
        <div className={`${style.iconWrapper} ${isOpen ? style.open : ''}`}>
          <Icon name="chevron-right" style={{ scale: '1.2' }} />
        </div>
      </div>
      {isOpen && (
        <div className={style.regionGrid}>
          {items.map((item) => (
            <div key={item.id} onClick={() => handleOpen(item)}>
              <DiveSiteItem diveSite={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function BoundaryDiveSitesView(props: BoundaryDiveSitesViewProps) {
  // Group the dive sites
  const groupedSites = React.useMemo(() => {
    if (!props.diveSites) return {};
    return props.diveSites.reduce((acc, site) => {
      const region = site.region || 'Other';
      if (!acc[region]) acc[region] = [];
      acc[region].push(site);
      return acc;
    }, {} as Record<string, DiveSiteWithUserName[]>);
  }, [props.diveSites]);

  return (
    <InfiniteScroll
      key={props.uniqueKey}
      loadMore={props.loadMoreDiveSites}
      hasMore={props.hasMoreDiveSites}
      isLoading={props.isLoadingDiveSites}
      renderEmpty={() => (<EmptyState iconName="anchor" text={ScreenData.Sidebar.diveSiteEmptyDrawer} />)}
    >
      {Object.entries(groupedSites).map(([region, items]) => (
        <RegionAccordion 
          key={region} 
          region={region} 
          items={items} 
          handleOpen={props.handleOpenDiveSite} 
        />
      ))}
    </InfiniteScroll>
  );
}
