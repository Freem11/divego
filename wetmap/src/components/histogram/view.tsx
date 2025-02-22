import React from 'react';
import DataBar from './histogramDataBar';
import style from './style.module.scss';
import { HistogramItem } from '../../entities/histogram';

type HistogramViewProps = {
  histoData:  HistogramItem[]
  hoverHide?: boolean
};

export default function HistogramView(props: HistogramViewProps) {
  return (
    <div className={`${style.mainContainer} ${props.hoverHide && style.hoverHide}`}>
      <div className={style.barBox}>
        {props.histoData.length > 0
        && props.histoData.map((data, index) => {
          return <DataBar key={index} barValue={data.value} month={data.month} />;
        })}
      </div>
    </div>
  );
}
