import { HeatPoint } from '../../../entities/heatPoint';

export const heatPointToWeightedLocation = (heatPoint: HeatPoint) => {
  return {
    location: new google.maps.LatLng(heatPoint.lat, heatPoint.lng),
    weight:   heatPoint.weight,
  } as google.maps.visualization.WeightedLocation;
};
