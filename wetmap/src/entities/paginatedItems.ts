import { Pagination } from './pagination';


export class PaginatedItems<T> {
  items?:      T[] | null;
  filter?:     Partial<T> | null;
  loading?:    boolean;
  hasMore?:    boolean;
  pagination?: Pagination;

  constructor(props: Partial<PaginatedItems<T>> = {}) {
    this.items      = props.items || null;
    this.filter     = props.filter || null;
    this.loading    = props.loading || false;
    this.hasMore    = props.hasMore || false;
    this.pagination = props.pagination || new Pagination();
  }

  static updateItems(prev: PaginatedItems<any>, items: any[], reset: boolean = false) {
    // reset means we dont have to append items to the list
    // for example reset true means that boundaries changed and we have completely new list ofitems
    // reset false means that boundaries did not change and we have to append items to the list because pagination changed
    if (!items?.length) {
      return {
        ...prev,
        loading: false,
        hasMore: false,
        items:   reset ? [] : prev.items,
      };
    }

    if (prev.items === null) {
      return { ...this, items, loading: false };
    }

    return {
      ...prev,
      loading: false,
      items:   reset ? items : [prev.items, ...items],
    };
  }
}
