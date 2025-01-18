import { GPSBubble } from '../entities/GPSBubble';
import { getDiveSitesWithUser } from '../supabaseCalls/diveSiteSupabaseCalls';

type Filter = {
  userid?: string
};

export async function getDiveSitesInBoundaries(boundaries: google.maps.LatLngBounds, filter?: Filter) {
  const bubble = GPSBubble.createFromBoundaries(boundaries);

  if (bubble.isIDL()) {
    const american = await getDiveSitesWithUser(bubble.getAmericanBubble(), filter);
    const asian = await getDiveSitesWithUser(bubble.getAsianBubble(), filter);

    return [...asian, ...american];
  } else {
    return await getDiveSitesWithUser(bubble, filter);
  }
}
