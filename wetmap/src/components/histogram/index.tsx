import React, { useState, useContext, useEffect } from 'react';
// import { PhotoContext } from '../contexts/photoContext';
import { MapContext } from '../googleMap/mapContext';
import { GPSBubble } from '../../entities/GPSBubble';
import { getHistoData } from '../../supabaseCalls/photoSupabaseCalls';
import HistogramView from './view';
import { HistogramItem, HistogramSupaData } from '../../entities/histogram';

type HistogramProps = {
  animal:    string
};

export default function Histogram(props: HistogramProps) {
  const { boundaries } = useContext(MapContext);
  // const photoContext = useContext(PhotoContext);
  // const { selectedAnimals } = useContext(PhotoContext);
  const [histoData, setHistoData] = useState<HistogramItem[]>([]);

  useEffect(() => {
    if (boundaries) {
      getHistogramData();
    }
  }, [boundaries]);

  // photoContext.heatPoints,

  const getHistogramData = async () => {
    if (boundaries) {
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      const historgramData = await GPSBubble.getItemsInGpsBubble(getHistoData, bubble, [props.animal]);

      let i = 1;
      const dataArray = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
