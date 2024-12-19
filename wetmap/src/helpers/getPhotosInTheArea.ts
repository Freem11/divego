import { Photo } from '../entities/photos';
import { getPhotosforMapArea } from '../supabaseCalls/photoSupabaseCalls';

export default async function getPhotosInTheArea(search: string, minLat: number, maxLat: number, minLng: number, maxLng: number): Promise<Photo[]> {
  const param = {
    animal: search,
    minLat,
    maxLat,
    minLng,
    maxLng,
  };

  if (minLng > maxLng) {
    const AmericanPhotos = await getPhotosforMapArea({ ...param, minLng: -180 });
    const AsianPhotos = await getPhotosforMapArea({ ...param, maxLng: 180 });

    return [...AsianPhotos, ...AmericanPhotos];
  } else {
    return await getPhotosforMapArea(param);
  }
}
