import React, { useContext } from 'react';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import PhotoItem from './photoItem';

export default function SelectedAreaPhotos() {
  const { photos, setPhotos } = useContext(MapBoundsContext);
  if (!photos?.items) {
    return <div className="p-2">Loading...</div>;
  }
  if (!photos?.items.length) {
    return <div className="p-2">No Dive Sites in this area</div>;
  }

  return (
    <div className="p-2">
      {photos.items.map((photo, index) => {
        return (
          <div key={index}>
            <PhotoItem photo={photo} />
          </div>
        );
      })}

      <span onClick={() => {
        setPhotos({ ...photos, pagination: photos?.pagination?.prev() });
      }}
      >
        Prev
      </span>

      <span onClick={() => {
        setPhotos({ ...photos, pagination: photos?.pagination?.next() });
      }}
      >
        Next
      </span>
    </div>
  );
}
