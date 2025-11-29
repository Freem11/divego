import React, { useCallback, useContext, useEffect } from 'react';
import { DiveSiteContext } from '../contexts/diveSiteContext';
import { ModalContext } from '../reusables/modal/context';
import DiveSite from '../newModals/diveSite';
import { DiveSiteWithUserName } from '../../entities/diveSite';
import { MapContext } from '../googleMap/mapContext';
import { BoundaryDiveSitesView } from './view';
import { useNavigate } from 'react-router-dom';

export function BoundaryDiveSites() {
  const { updateDiveSiteCollection, collection, setSelectedDiveSite } = useContext(DiveSiteContext);
  const { modalShow } = useContext(ModalContext);
  const { boundaries } = useContext(MapContext);
  const navigate = useNavigate();


  useEffect(() => {
    updateDiveSiteCollection(1, true);
  }, [boundaries]);

  const loadMore = useCallback((page: number) => {
    updateDiveSiteCollection(page);
  }, [boundaries]);


  const handleOpenDiveSite = (item: DiveSiteWithUserName) => {
    navigate(`/divesites/${item.id}`);
    // setSelectedDiveSite(item);
    // modalShow(DiveSite, {
    //   size:  'large',
    //   panTo: true,
    // });
  };

  return (
    <BoundaryDiveSitesView
      uniqueKey={boundaries?.toString()}
      diveSites={collection.items}
      handleOpenDiveSite={handleOpenDiveSite}
      hasMoreDiveSites={collection.hasMore}
      isLoadingDiveSites={collection.isLoading}
      loadMoreDiveSites={loadMore}
    />
  );
}
