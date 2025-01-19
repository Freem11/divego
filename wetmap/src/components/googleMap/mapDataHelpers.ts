import { HeatPoint } from './types';

function formatHeatVals(heatValues: any[]) {
  const newArr: HeatPoint[] = [];
  if (heatValues) {
    heatValues.forEach((heatPoint) => {
      const latlng = new google.maps.LatLng(heatPoint.lat, heatPoint.lng);
      const newpt: HeatPoint = {
        location: latlng,
        weight:   heatPoint.weight,
      };
      newArr.push(newpt);
    });
  }
  return newArr;
}

export { formatHeatVals };
