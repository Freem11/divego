import React, { useContext } from 'react';
import DiveSiteItem from './diveSiteItem';
import { MapBoundariesDiveSiteContext } from '../contexts/mapBoundariesDiveSiteContext';
import { SelectedDiveSiteContext } from '../contexts/selectedDiveSiteContext';
import { ModalContext } from '../reusables/modal/context';
import DiveSite from '../newModals/diveSite';

export function BoundaryDiveSites() {
  const { paginator } = useContext(MapBoundariesDiveSiteContext);
  const { setSelectedDiveSite } = useContext(SelectedDiveSiteContext);
  const { modalShow } = useContext(ModalContext);

  if (!paginator.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!paginator.items.length) {
    return <div className="p-2">No Dive Sites in this area</div>;
  }

  const openModal = (item) => {
    setSelectedDiveSite(item);
    modalShow(DiveSite, {
      panTo: true,
      size:  'large',
    });
  };

  return (
    <div className="p-2 scrollable">
      {paginator?.items.map((item) => {
        return (
          <div key={item.id} onClick={() => openModal(item)}>
            <DiveSiteItem diveSite={item} />
          </div>
        );
      })}
    </div>
  );
}
