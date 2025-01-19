import React, { useContext } from 'react';
import DiveSiteItem from './diveSiteItem';
import { MapBoundariesDiveSiteContext } from '../contexts/mapBoundariesDiveSiteContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { ModalContext } from '../reusables/modal/context';
import DiveSite from '../newModals/diveSite';
import { DiveSiteWithUserName } from '../../entities/diveSite';

export function BoundaryDiveSites() {
  const { pagedCollection } = useContext(MapBoundariesDiveSiteContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { modalShow } = useContext(ModalContext);

  if (!pagedCollection.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!pagedCollection.items.length) {
    return <div className="p-2">No Dive Sites in this area</div>;
  }

  const openModal = (item: DiveSiteWithUserName) => {
    setSelectedDiveSite(item);
    modalShow(DiveSite, {
      panTo: true,
      size:  'large',
    });
  };

  return (
    <div className="p-2 scrollable">
      {pagedCollection?.items.map((item: DiveSiteWithUserName) => {
        return (
          <div key={item.id} onClick={() => openModal(item)}>
            <DiveSiteItem diveSite={item} />
          </div>
        );
      })}
    </div>
  );
}
