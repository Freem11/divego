import { DynamicSelectOptions } from '../../reusables/dynamicSelect/DynamicSelectOptions';
import getPlacePredictions from '../../../helpers/googleMapAutocomplete';
import { getSiteNamesThatFit } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { optionData } from './types';

export class DynamicSelectOptionsMainSearch extends DynamicSelectOptions {
  static getMoreOptions(search: string) {
    const placesPromise = getPlacePredictions({ input: search, types: ['locality'] });
    const diveSitePromise = getSiteNamesThatFit(search);

    return Promise.all([placesPromise, diveSitePromise]).then(([places, diveSites]) => {
      const options: optionData[] = [];
      places?.predictions?.forEach((place) => {
        options.push({ key: place.place_id, label: place.description, data: { type: 'place', id: place.place_id } });
      });

      diveSites?.forEach((diveSite) => {
        options.push({ key: diveSite.id, label: diveSite.region ? `${diveSite.name} - ${diveSite.region}` : diveSite.name, data: { type: 'diveSite', id: diveSite.id.toString() } });
      });

      return { options, totalCount: null };
    });
  }
}
