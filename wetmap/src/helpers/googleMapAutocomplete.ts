export default function getPlacePredictions(options: google.maps.places.AutocompletionRequest): Promise<google.maps.places.AutocompletePrediction[] | null> {
  const placesLib = window?.google?.maps?.places;
  if (!placesLib) {
    return Promise.resolve(null);
  }

  const service = new placesLib.AutocompleteService();

  return new Promise(function (resolve, reject) {
    service.getPlacePredictions(options, function (place, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        reject(new Error(status));
      } else {
        resolve(place);
      }
    });
  });
}
