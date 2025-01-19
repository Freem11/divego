import { GPSBubble } from '../entities/GPSBubble';
import { getHeatPoints } from '../supabaseCalls/heatPointSupabaseCalls';

type Filter = {
  animal?: string[]
};

export async function getHeatPointsInBoundaries(boundaries: google.maps.LatLngBounds, filter?: Filter) {
  const bubble = GPSBubble.createFromBoundaries(boundaries);

  if (bubble.isIDL()) {
    const american = await getHeatPoints(bubble.getAmericanBubble(), filter);
    const asian = await getHeatPoints(bubble.getAsianBubble(), filter);
    return [
      ...(american ? american : []),
      ...(asian ? asian : []),
    ];
  } else {
    const items = await getHeatPoints(bubble, filter);
    return items ? items : [];
  }
}
