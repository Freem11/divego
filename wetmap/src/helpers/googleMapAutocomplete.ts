export default function getPlacePredictions(options: google.maps.places.AutocompletionRequest) {
  const placesLib = window?.google?.maps?.places;
  if (!placesLib) {
    return Promise.resolve(null);
  }

  const service = new placesLib.AutocompleteService();
  return service.getPlacePredictions(options);
}
