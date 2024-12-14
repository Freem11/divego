export default function getPlaceLocation(options: google.maps.GeocoderRequest) {
  const geocoder = window?.google?.maps;

  if (!geocoder) {
    return Promise.resolve(null);
  }

  const service = new geocoder.Geocoder();
  return service.geocode(options);
}
