import React from 'react';
import ItineraryCard from '../itineraryCard';
import { ItineraryItem } from '../../entities/itineraryItem';
import style from './style.module.scss';
import EmptyState from '../reusables/emptyState';
import ScreenData from '../newModals/screenData.json';
import { BoundaryDiveShops } from '../boundaryDiveShops';
import { BoundaryAnimals } from '../boundaryAnimals';
import { BoundaryDiveSites } from '../boundaryDiveSites';

type FloatingWidgetProps = {
  content:    string | React.FC
};

export default function FloatingWidget({ content }: FloatingWidgetProps) {
return (
    <>
      <div className={style.floatingContainer}>
        {typeof content === 'function' ? React.createElement(content) : content}
        <div className={style.floatingContainerBackground}></div>
      </div>
    </>
  );
}
