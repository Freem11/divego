import { DynamicSelectOptions } from '../../reusables/dynamicSelect/DynamicSelectOptions';
import getPlacePredictions from '../../../helpers/googleMapAutocomplete';
import { getSiteNamesThatFit } from '../../../supabaseCalls/diveSiteSupabaseCalls';
import { Option } from '../../reusables/select';

export type data = {
  id:   string
  type: string
};

export class DynamicSelectOptionsMainSearch extends DynamicSelectOptions {
  static getMoreOptions(search: string, limit, skip) {
    const placesPromise = getPlacePredictions({ input: search, types: ['locality'] });
    const diveSitePromise = getSiteNamesThatFit(search);

    return Promise.all([placesPromise, diveSitePromise]).then(([places, diveSites]) => {
      const options: Option<data>[] = [];
      places?.predictions?.forEach((place) => {
        options.push({ key: place.place_id, label: place.description, data: { type: 'place', id: place.place_id } });
      });

      diveSites?.forEach((diveSite) => {
        options.push({ key: diveSite.id.toString(), label: diveSite.name, data: { type: 'diveSite', id: diveSite.id.toString() } });
      });

      return { options, totalCount: null };
    });
  }
}
