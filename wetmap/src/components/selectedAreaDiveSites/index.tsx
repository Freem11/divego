import React, { useState, useContext } from 'react';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import DiveSiteItem from './DiveSitetem';

export default function SelectedAreaDiveSites() {
  const { diveSites } = useContext(MapBoundsContext);
  // const [search, setSearch] = useState('');
  // const [photos, setPhotos] = useState<Photo[]>([]);


  return (
    <div className="p-2">
      {!diveSites && <div>Loading</div>}
      {diveSites?.length === 0 && <div>No Dive Sites in this area</div>}
      {diveSites?.map((diveSite, index) => {
        return (
          <div key={index}>
            <DiveSiteItem diveSite={diveSite} />
          </div>
        );
      })}
    </div>
  );
}
