import { DynamicSelectOptions } from '../../reusables/dynamicSelect/DynamicSelectOptions';
import getPlacePredictions from '../../../helpers/googleMapAutocomplete';
import { getSiteNamesThatFit } from '../../../supabaseCalls/diveSiteSupabaseCalls';


export class DynamicSelectOptionsMainSearch extends DynamicSelectOptions {
  static getMoreOptions(search: string, limit, skip) {
    const placesPromise = getPlacePredictions({ input: search, types: ['locality'] });
    const diveSitePromise = getSiteNamesThatFit(search);

    return Promise.all([placesPromise, diveSitePromise]).then(([places, diveSites]) => {
      const options = [];
      places?.predictions?.forEach((place) => {
        options.push({ key: place.place_id, label: place.description, data: { type: 'place', id: place.place_id } });
      });

      diveSites?.forEach((diveSite) => {
        options.push({ key: diveSite.id, label: diveSite.name, data: { type: 'diveSite', id: diveSite.id } });
      });

      return { options, totalCount: null };
    });
  }
}
