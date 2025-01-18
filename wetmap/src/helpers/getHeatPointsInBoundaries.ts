import { GPSBubble } from '../entities/GPSBubble';
import { getPhotosforMapArea } from '../supabaseCalls/photoSupabaseCalls';
import { Pagination } from '../entities/pagination';
import { getHeatPoints, getHeatPointsWithUser, getHeatPointsWithUserEmpty } from '../supabaseCalls/heatPointSupabaseCalls';


function formatHeatVals(heatValues: HeatData[]) {
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

type Filter = {
  animal?: string[]
};
export async function getHeatPointsInBoundaries(boundaries: google.maps.LatLngBounds, filter?: Filter) {
  const bubble = GPSBubble.createFromBoundaries(boundaries);
  const items = await getHeatPoints(bubble, filter);

  return formatHeatVals(items); // items;

  // if (bubble.isIDL()) {
  //   const american = await getPhotosforMapArea(bubble.getAmericanBubble(), filter, pagination);
  //   const asian = await getPhotosforMapArea(bubble.getAsianBubble(), filter, pagination);

  //   return [...asian, ...american];
  // } else {
  //   return await getPhotosforMapArea(bubble, filter, pagination);
  // }

  //       const latHi = boundaries.getNorthEast().lat();
  //       const latLo = boundaries.getSouthWest().lat();
  //       const lngE = boundaries.getNorthEast().lng();
  //       const lngW = boundaries.getSouthWest().lng();

  //       const diveSiteList = await getDiveSiteData(latHi, latLo, lngE, lngW);
  //       setnewSites(!divesTog ? [] : diveSiteList);

  //       const heatPointList = await getHeatPointData(latHi, latLo, lngE, lngW, animalVal);

  if (westValue > eastValue) {
    if (selectedCreatures.length === 0) {
      const AmericanHeatPoints = await getHeatPointsWithUserEmpty({
        myCreatures: '',
        minLat:      southValue,
        maxLat:      northValue,
        minLng:      -180,
        maxLng:      eastValue,
      });
      const AsianHeatPoints = await getHeatPointsWithUserEmpty({
        myCreatures: '',
        minLat:      southValue,
        maxLat:      northValue,
        minLng:      westValue,
        maxLng:      180,
      });
      const heatPointList = [...AsianHeatPoints, ...AmericanHeatPoints];
      return formatHeatVals(heatPointList);
    } else {
      const AmericanHeatPoints = await getHeatPointsWithUser({
        myCreatures:          '',
        minLat:               southValue,
        maxLat:               northValue,
        minLng:               -180,
        maxLng:               eastValue,
        animalMultiSelection: selectedCreatures,
      });
      const AsianHeatPoints = await getHeatPointsWithUser({
        myCreatures:          '',
        minLat:               southValue,
        maxLat:               northValue,
        minLng:               westValue,
        maxLng:               180,
        animalMultiSelection: selectedCreatures,
      });
      const heatPointList = [...AsianHeatPoints, ...AmericanHeatPoints];
      return formatHeatVals(heatPointList);
    }
  } else {
    if (selectedCreatures.length === 0) {
      const heatPointList = await getHeatPointsWithUserEmpty({
        myCreatures: '',
        minLat:               southValue,
        maxLat:               northValue,
        minLng:               westValue,
        maxLng:               eastValue,
      });
      return formatHeatVals(heatPointList);
    } else {
      const heatPointList = await getHeatPointsWithUser({
        animalMultiSelection: selectedCreatures,
        myCreatures:          '',
        minLat:               southValue,
        maxLat:               northValue,
        minLng:               westValue,
        maxLng:               eastValue,
      });
      return formatHeatVals(heatPointList);
    }
  }
}
