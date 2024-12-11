import { getAnimalNamesThatFit } from '../supabaseCalls/photoSupabaseCalls';
import { DynamicSelectOptions } from '../components/reusables/dynamicSelect/DynamicSelectOptions';

export class DynamicSelectMainSearch extends DynamicSelectOptions {
  convertItem(item) {
    return { key: item.id, label: item.label };
  }

  static getMoreOptions(search, limit, skip) {
    return getAnimalNamesThatFit(search).then((response) => {
      return new DynamicSelectMainSearch().convertHttpResponse(response);
    });
  }
}
