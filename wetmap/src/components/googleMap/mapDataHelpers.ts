import {
  getDiveSitesWithUser,
} from '../../supabaseCalls/diveSiteSupabaseCalls';
import {
  getHeatPointsWithUser,
  getHeatPointsWithUserEmpty,
} from '../../supabaseCalls/heatPointSupabaseCalls';
import { HeatPoint, HeatData } from './types';

async function getDiveSiteData(northValue: number, southValue: number, eastValue: number, westValue: number) {
  if (westValue > eastValue) {
    const AmericanDiveSites = await getDiveSitesWithUser({
      myDiveSites: '',
      minLat:      southValue,
      maxLat:      northValue,
      minLng:      -180,
      maxLng:      eastValue,
    });
    const AsianDiveSites = await getDiveSitesWithUser({
      myDiveSites: '',
      minLat:      southValue,
      maxLat:      northValue,
      minLng:      westValue,
      maxLng:      180,
    });
    const diveSiteList = [...AsianDiveSites, ...AmericanDiveSites];
    return diveSiteList;
  } else {
    const diveSiteList = await getDiveSitesWithUser({
      myDiveSites: '',
      minLat:               southValue,
      maxLat:               northValue,
      minLng:               westValue,
      maxLng:               eastValue,
    });
    return diveSiteList;
  }
}

async function getHeatPointData(northValue: number, southValue: number, eastValue: number, westValue: number, selectedCreatures: string[]) {
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

export { getDiveSiteData, getHeatPointData, formatHeatVals };
