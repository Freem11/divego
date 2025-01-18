import { GPSBubble } from '../entities/GPSBubble';
import { getPhotosforMapArea } from '../supabaseCalls/photoSupabaseCalls';
import { Pagination } from '../entities/pagination';


type Filter = {
  label?: string
};
export async function getPhotosInBoundaries(boundaries: google.maps.LatLngBounds, filter?: Filter, pagination?: Pagination) {
  const bubble = GPSBubble.createFromBoundaries(boundaries);

  if (bubble.isIDL()) {
    const american = await getPhotosforMapArea(bubble.getAmericanBubble(), filter, pagination);
    const asian = await getPhotosforMapArea(bubble.getAsianBubble(), filter, pagination);

    return [...asian, ...american];
  } else {
    return await getPhotosforMapArea(bubble, filter, pagination);
  }
}
