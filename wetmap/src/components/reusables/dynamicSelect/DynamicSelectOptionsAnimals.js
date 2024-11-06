import { getAnimalNamesThatFit } from '../../../supabaseCalls/photoSupabaseCalls';
import { DynamicSelectOptions } from './DynamicSelectOptions';

export class DynamicSelectOptionsAnimals extends DynamicSelectOptions {
  convertItem(item) {
    return { value: item.id, label: item.label };
  }

  static getMoreOptions(search, limit, skip) {
    return getAnimalNamesThatFit(search).then((response) => {
      return new DynamicSelectOptionsAnimals().convertHttpResponse(response);
    });
  }
}
