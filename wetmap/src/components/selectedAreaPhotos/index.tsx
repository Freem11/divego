import React, { useState, useContext, useEffect } from 'react';
import getPhotosInTheArea from '../../helpers/getPhotosInTheArea';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import PhotoItem from './photoItem';
import { Photo } from '../../entities/photos';

export default function SelectedAreaPhotos() {
  const { boundaries } = useContext(MapBoundsContext);
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    (async () => {
      if (boundaries) {
        const photos = await getPhotosInTheArea(search, boundaries[1], boundaries[3], boundaries[0], boundaries[2]);
        setPhotos(photos);
        // const animalArray = Array.from(
        //   new Set(photos.map(a => a.label)),
        // ).map((label) => {
        //   return photos.find(a => a.label === label);
        // });
      }
    })();
  }, [search, boundaries]);

  return (
    <div className="p-2">
      {photos.map((photo, index) => {
        return (
          <div key={index}>
            <PhotoItem photo={photo} />
          </div>
        );
      })}
    </div>
  );
}
