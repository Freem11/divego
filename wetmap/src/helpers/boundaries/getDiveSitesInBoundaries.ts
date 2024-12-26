import { getDiveSitesWithUser } from '../../supabaseCalls/diveSiteSupabaseCalls';

export async function getDiveSitesInBoundaries(boundaries: google.maps.LatLngBounds) {
  const param = {
    myDiveSites: '',
    minLat:      boundaries.getSouthWest().lat(),
    maxLat:      boundaries.getNorthEast().lat(),
    minLng:      boundaries.getSouthWest().lng(),
    maxLng:      boundaries.getNorthEast().lng(),
  };

  if (param.minLng > param.maxLng) {
    const american = await getDiveSitesWithUser({ ...param, minLng: -180 });
    const asian = await getDiveSitesWithUser({ ...param, maxLng: 180 });

    return [...asian, ...american];
  } else {
    return await getDiveSitesWithUser(param);
  }
}
