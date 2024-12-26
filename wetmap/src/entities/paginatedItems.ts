import { Pagination } from './pagination';


export type PaginatedItems<T> = {
  items:       T[] | null
  pagination?: Pagination
  filter?:     Partial<T>
};
