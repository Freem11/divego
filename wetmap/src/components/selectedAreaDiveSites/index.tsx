import React, { useContext } from 'react';
import DiveSiteItem from './DiveSitetem';
import { MapBoundariesDiveSiteContext } from '../contexts/mapBoundariesDiveSiteContext';
import InfiniteScroll from '../reusables/infiniteScroll';
import { DiveSiteWithUserName } from '../../entities/diveSite';

export default function SelectedAreaDiveSites() {
  const { paginator } = useContext(MapBoundariesDiveSiteContext);

  if (!paginator.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!paginator.items.length) {
    return <div className="p-2">No Dive Sites in this area</div>;
  }

  return (
    <div className="p-2">
      {paginator?.items.map((diveSite, index) => {
        return (
          <div key={index}>
            <DiveSiteItem diveSite={diveSite} />
          </div>
        );
      })}
    </div>
  );
}
