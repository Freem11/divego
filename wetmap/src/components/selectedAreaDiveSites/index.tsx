import React, { useState, useContext } from 'react';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import DiveSiteItem from './DiveSitetem';

export default function SelectedAreaDiveSites() {
  const { diveSites } = useContext(MapBoundsContext);
  // const [search, setSearch] = useState('');
  // const [photos, setPhotos] = useState<Photo[]>([]);

  if (!diveSites.items) {
    return <div className="p-2">Loading...</div>;
  }

  if (!diveSites.items.length) {
    return <div className="p-2">No Dive Sites in this area</div>;
  }

  return (
    <div className="p-2">
      {diveSites?.items.map((diveSite, index) => {
        return (
          <div key={index}>
            <DiveSiteItem diveSite={diveSite} />
          </div>
        );
      })}
    </div>
  );
}
