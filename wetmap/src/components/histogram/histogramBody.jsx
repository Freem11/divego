import React, { useState, useContext, useEffect } from 'react';
import { AnimalContext } from '../contexts/animalContext';
import { MapBoundsContext } from '../contexts/mapBoundariesContext';
import { getHistoData } from '../../supabaseCalls/photoSupabaseCalls';
import AxisBar from './histogramAxis';
import DataBar from './histogramBar';
import './histogram.css';

export default function Histogram() {
  const { animalVal } = useContext(AnimalContext);
  const { boundaries } = useContext(MapBoundsContext);
  const [histoData, setHistoData] = useState([]);

  useEffect(() => {
    getHistogramData();
  }, []);

  useEffect(() => {
    getHistogramData();
  }, [animalVal, boundaries]);

  const getHistogramData = async () => {
    if (boundaries) {
      try {
        const historgramData = await getHistoData({
          animals: animalVal,
          minLat:  boundaries[1],
          maxLat:  boundaries[3],
          minLng:  boundaries[0],
          maxLng:  boundaries[2],
        });

        let i = 1;
        let dataArray = [];
        let maxVal;
        let percentArr;

        if (historgramData) {
          for (i = 1; i < 13; i++) {
            historgramData.forEach((dataPoint) => {
              if (dataPoint.month === i) {
                dataArray.push(dataPoint.num);
              }
            });
            if (dataArray.length < i) {
              dataArray.push(0);
            }
          }
          maxVal = dataArray.reduce((a, b) => Math.max(a, b), -Infinity);
          if (maxVal === 0) {
            percentArr = dataArray;
          }
          else {
            percentArr = dataArray.map(val => (val / maxVal) * 100);
          }

          setHistoData(percentArr);
        }
      }
      catch (e) {
        console.log({ title: 'Error', message: e.message });
      }
    }
  };

  return (
    <div className="mainContainer" pointerEvents="none">
      <div className="barBox" pointerEvents="none">
        {histoData.length > 0
        && histoData.map((moddedVal, index) => {
          return <DataBar key={index} moddedVal={moddedVal} />;
        })}
      </div>
      <AxisBar />
    </div>
  );
}
