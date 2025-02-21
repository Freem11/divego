import React from 'react';
import style from './style.module.scss';

type histogramItemProps = {
  barValue: number
  month:    string
};

export default function DataBar(props: histogramItemProps) {
  return (
    <div className={style.histogramLine}>
      <div className={style.monthLabel}>{props.month}</div>
      <div className={style.barContainer} style={{ width: props.barValue + 'px' }}>
      </div>
    </div>
  );
}
