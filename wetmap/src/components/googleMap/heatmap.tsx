import React, { useRef } from 'react';
import { MapWithHeatmapProps } from './types';
import { useEffect } from 'react';

export const MapWithHeatmap: React.FC<MapWithHeatmapProps> = ({
  map,
  heatpts,
  mapConfig,
  heatpointConfigs,
}) => {
  const heatmapRef = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  useEffect(() => {
    if (!map) return;

    if (!heatmapRef.current) {
      heatmapRef.current = new google.maps.visualization.HeatmapLayer({
        data: heatpts,
        map:  map,
        ...heatpointConfigs,
      });
    } else {
      heatmapRef.current.setData(heatpts);
    }

    heatmapRef.current.setOptions(heatpointConfigs);

    if ([0, 2].includes(mapConfig)) {
      heatmapRef.current.setMap(map);
    } else {
      heatmapRef.current.setMap(null);
    }

    return () => {
      if (heatmapRef.current) {
        heatmapRef.current.setMap(null);
      }
    };
  }, [map, heatpts, mapConfig, heatpointConfigs]);

  return null;
};
