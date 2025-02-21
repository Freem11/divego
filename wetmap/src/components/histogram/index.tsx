import React, { useState, useContext, useEffect } from 'react';
import { PhotoContext } from '../contexts/photoContext';
import { MapContext } from '../googleMap/mapContext';
import { GPSBubble } from '../../entities/GPSBubble';
import { getHistoData } from '../../supabaseCalls/photoSupabaseCalls';
import HistogramView from './view';
import { HistogramItem, HistogramSupaData } from '../../entities/histogram';

export default function Histogram() {
  const { boundaries } = useContext(MapContext);
  const photoContext = useContext(PhotoContext);
  const { selectedAnimals } = useContext(PhotoContext);
  const [histoData, setHistoData] = useState<HistogramItem[]>([]);

  useEffect(() => {
    if (boundaries) {
      getHistogramData();
    }
  }, []);

  useEffect(() => {
    if (boundaries) {
      getHistogramData();
    }
  }, [photoContext.heatPoints, boundaries]);

  const getHistogramData = async () => {
    if (boundaries) {
      const bubble = GPSBubble.createFromBoundaries(boundaries);
      try {
        const historgramData: HistogramSupaData[] = await getHistoData({
          animals: selectedAnimals,
          minLat:  bubble.minLat,
          maxLat:  bubble.maxLat,
          minLng:  bubble.minLng,
          maxLng:  bubble.maxLng,
        });

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
      } catch (e) {
        console.log({ title: 'Error', message: (e as Error).message });
      }
    }
  };

  return (
    <HistogramView histoData={histoData} />
  );
}
