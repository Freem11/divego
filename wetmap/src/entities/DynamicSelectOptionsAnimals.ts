import { getAnimalNamesThatFit } from '../supabaseCalls/photoSupabaseCalls';
import { DynamicSelectOptions } from '../components/reusables/dynamicSelect/DynamicSelectOptions';

export class DynamicSelectOptionsAnimals extends DynamicSelectOptions {
  convertItem(item) {
    return { key: item.id, label: item.label };
  }

  static getMoreOptions(search, limit, skip) {
    return getAnimalNamesThatFit(search).then((response) => {
      return new DynamicSelectOptionsAnimals().convertHttpResponse(response);
    });
  }
}
