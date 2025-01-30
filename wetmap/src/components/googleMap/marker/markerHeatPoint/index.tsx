import  { useEffect, useRef } from 'react';
import { HeatPoint } from '../../../../entities/heatPoint';
import { heatPointToWeightedLocation } from '../../dto/heatPointToWeightedLocation';

type MarkerHeatPointProps = {
  map:        google.maps.Map | null
  options?:   google.maps.visualization.HeatmapLayerOptions
  heatPoints: HeatPoint[]
};

export function MarkerHeatPoint(props: MarkerHeatPointProps) {
  const ref = useRef<google.maps.visualization.HeatmapLayer | null>(null);

  const options = {
    opacity: 1,
    radius:  16,
    ...(props.options ?? {}),
  };

  useEffect(() => {
    if (!props.map) {
      return;
    }

    options.data = props.heatPoints.map(heatPoint => heatPointToWeightedLocation(heatPoint));
    if (!ref.current) {
      ref.current = new google.maps.visualization.HeatmapLayer(options);
    } else {
      if (options.data) {
        ref.current.setData(options.data);
      }
    }

    ref.current.setMap(props.map);
    return () => {
      if (ref.current) {
        ref.current.setMap(null);
      }
    };
  }, [props.heatPoints]);

  return null;
}
