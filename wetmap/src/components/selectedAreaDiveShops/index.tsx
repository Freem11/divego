import React, { useState, useContext, useEffect } from 'react';
import getPhotosInTheArea from '../../helpers/getPhotosInTheArea';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import PhotoItem from './DiveShoptem';
import { Photo } from '../../entities/photos';
import DiveShopItem from './DiveShoptem';

export default function SelectedAreaDiveShops() {
  const { diveShops } = useContext(MapBoundsContext);


  return (
    <div className="p-2">
      {!diveShops && <div>Loading</div>}
      {diveShops?.length === 0 && <div>No Dive Shops in this area</div>}
      {diveShops?.map((diveShop, index) => {
        return (
          <div key={index}>
            <DiveShopItem diveShop={diveShop} />
          </div>
        );
      })}
    </div>
  );
}
