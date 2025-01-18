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

  static createFromBoundaries(boundaries: google.maps.LatLngBounds) {
    return new GPSBubble({
      minLat: boundaries.getSouthWest().lat(),
      maxLat: boundaries.getNorthEast().lat(),
      minLng: boundaries.getSouthWest().lng(),
      maxLng: boundaries.getNorthEast().lng(),
    });
  }
}
