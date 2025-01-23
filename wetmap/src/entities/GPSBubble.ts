export class GPSBubble {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;

  constructor({ minLat, maxLat, minLng, maxLng }: { minLat: number, maxLat: number, minLng: number, maxLng: number }) {
    this.minLat = minLat;
    this.maxLat = maxLat;
    this.minLng = minLng;
    this.maxLng = maxLng;
  }

  /**
   * IDL = International Date Line
   * @returns true is current bubble crosses the IDL
   */
  isIDL(): boolean {
    return this.minLng > this.maxLng;
  }

  getAsianBubble() {
    return new GPSBubble({
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLng: this.minLng,
      maxLng: 180,
    });
  }

  getAmericanBubble() {
    return new GPSBubble({
      minLat: this.minLat,
      maxLat: this.maxLat,
      minLng: -180,
      maxLng: this.maxLng,
    });
  }

  /**
 * GPS bubble - some area on the map.
 * If GPS bubble crosses the IDL(International Date Line), we need to get items from both sides of the IDL
 * so we need to do two API request twice
 * @param bubble GPS bubble
 * @param callable - API request to get items
 * @param args - arguments for API request
 * @returns
 */
  static async getItemsInGpsBubble<T extends (...args: any[]) => any>(callable: T, ...args: Parameters<T>): Promise<ReturnType<T>> {
    const [bubble, ...rest] = args as GPSBubble[];
    if (bubble.isIDL()) {
      const american = await callable(bubble.getAmericanBubble(), ...rest);
      const asian = await callable(bubble.getAsianBubble(), ...rest);

      return [
        ...(american ? american : []),
        ...(asian ? asian : []),
      ] as ReturnType<T>;
    } else {
      return await callable(bubble, ...rest);
    }
  }

  static createFromBoundaries(boundaries: google.maps.LatLngBounds) {
    return new GPSBubble({
      minLat: boundaries.getSouthWest().lat(),
      maxLat: boundaries.getNorthEast().lat(),
      minLng: boundaries.getSouthWest().lng(),
      maxLng: boundaries.getNorthEast().lng(),
    });
  }
}
