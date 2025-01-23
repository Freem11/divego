import { Pagination } from './pagination';

const getNewHasMore = (items: any[], ipp?: number) => {
  ipp = ipp || Pagination.defaultIpp;
  if (!items) {
    return false;
  }
  if (items.length < ipp) {
    // no need to load more because there are no more items
    return false;
  }
  if (items.length > ipp) {
    // seems like there is no pagination - doesnt make sense to load more
    return false;
  }
  return true;
};

const getNewItems = (items: any[] | null, prevItems: any[] | null, reset: boolean) => {
  if (!items?.length) {
    return reset ? [] : prevItems;
  }

  if (!prevItems) {
    return items;
  }

  return reset ? items : [...prevItems, ...items];
};

export class PagedCollection<T> {
  items:      T[] | null;
  filter:     Partial<T> | null;
  hasMore:    boolean;
  isLoading:  boolean;
  pagination: Pagination;

  constructor(props: Partial<PagedCollection<T>> = {}) {
    this.items      = props.items || null;
    this.filter     = props.filter || null;
    this.hasMore    = props.hasMore || false;
    this.isLoading  = props.isLoading || false;
    this.pagination = props.pagination || new Pagination();
  }

  static updateItems(prev: PagedCollection<any>, items: any[], reset: boolean = false, pagination?: Pagination): PagedCollection<any> {
    // reset means we dont have to append items to the list
    // for example reset true means that boundaries changed and we have completely new list ofitems
    // reset false means that boundaries did not change and we have to append items to the list because pagination changed
    const result = {
      ...prev,
      isLoading: false,
      hasMore:   getNewHasMore(items, prev?.pagination?.ipp),
      items:     getNewItems(items, prev.items, reset),
    };

    if (pagination) {
      result.pagination = pagination;
    }

    return result;
  }
}
