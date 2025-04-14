import React, { useState, useContext, useEffect } from 'react';
import { MapContext } from '../googleMap/mapContext';
import { GPSBubble } from '../../entities/GPSBubble';
import { getHistoData } from '../../supabaseCalls/photoSupabaseCalls';
import HistogramView from './view';
import { HistogramItem, HistogramSupaData } from '../../entities/histogram';
import { useTranslation } from 'react-i18next';

type HistogramProps = {
  animal:    string
};

export default function Histogram(props: HistogramProps) {
  const { boundaries } = useContext(MapContext);
  const [histoData, setHistoData] = useState<HistogramItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (boundaries) {
      getHistogramData();
    }
  }, [boundaries]);

  const getHistogramData = async () => {
    if (boundaries) {
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const historgramData = await GPSBubble.getItemsInGpsBubble(getHistoData, bubble, [props.animal]);

      let i = 1;
      const dataArray = [];
      const months = [
        t('Common.Months.Jan'),
        t('Common.Months.Feb'),
        t('Common.Months.Mar'),
        t('Common.Months.Apr'),
        t('Common.Months.May'),
        t('Common.Months.Jun'),
        t('Common.Months.Jul'),
        t('Common.Months.Aug'),
        t('Common.Months.Sep'),
        t('Common.Months.Oct'),
        t('Common.Months.Nov'),
        t('Common.Months.Dec'),
      ];

      if (historgramData) {
        const maxVal = Math.max(...historgramData.map((item: { num: number }) => item.num));
        for (i = 1; i < 13; i++) {
          historgramData.forEach((dataPoint: HistogramSupaData) => {
            if (dataPoint.month === i) {
              dataArray.push({ value: (dataPoint.num / maxVal) * 100, month: months[i - 1] });
            }
          });
          if (dataArray.length < i) {
            dataArray.push({ value: 0, month: months[i - 1] });
          }
        }
        setHistoData(dataArray);
      }
    }
  };

  return (
    <HistogramView histoData={histoData} hoverHide={true} />
  );
}
