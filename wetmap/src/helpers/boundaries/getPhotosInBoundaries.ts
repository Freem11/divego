import { a } from 'react-spring';
import { Pagination } from '../../entities/pagination';
import { getPhotosforMapArea } from '../../supabaseCalls/photoSupabaseCalls';

type PhotoFilter = {
  label?: string
};

export async function getPhotosInBoundaries(boundaries: google.maps.LatLngBounds, filter?: PhotoFilter, pagination?: Pagination) {
  const param = {
    ...filter,
    minLat: boundaries.getSouthWest().lat(),
    maxLat: boundaries.getNorthEast().lat(),
    minLng: boundaries.getSouthWest().lng(),
    maxLng: boundaries.getNorthEast().lng(),
  };

  if (param.minLng > param.maxLng) {
    const american = await getPhotosforMapArea({ ...param, minLng: -180 }, pagination);
    const asian = await getPhotosforMapArea({ ...param, maxLng: 180 }, pagination);

    return [...asian, ...american];
  } else {
    return await getPhotosforMapArea(param, pagination);
  }
}
