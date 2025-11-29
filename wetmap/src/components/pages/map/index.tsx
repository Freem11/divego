import React from 'react';
import MapLoader from '../../googleMap';
import Tabs from '../../reusables/tabs';
import { BoundaryDiveShops } from '../../boundaryDiveShops';
import { BoundaryAnimals } from '../../boundaryAnimals';
import { BoundaryDiveSites } from '../../boundaryDiveSites';


export default function PageMap() {
  return (
    <>
      <div className="col-md-12 col-3 full-height scroll-container mb-4" style={{ overflow: 'hidden', height: '90vh' }}>
        <Tabs
          className="scroll-container non-scrollable"
          data={[
            { key: 't-1', className: 'scroll-container non-scrollable', title: 'Dive Sites',    content: BoundaryDiveSites },
            { key: 't-2', className: 'scroll-container non-scrollable', title: 'Sea Life',      content: BoundaryAnimals },
            { key: 't-3', className: 'scroll-container non-scrollable', title: 'Dive Centers',  content: BoundaryDiveShops },
          ]}
        />
      </div>

      <div className="col-md-12 col-9 full-height" style={{ height: '90vh' }}>
        <MapLoader />
      </div>
    </>
  );
}
