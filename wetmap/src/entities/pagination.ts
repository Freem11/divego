

export class Pagination {
  // ipp - items per page
  page: number;
  ipp:  number;
  sort: string;

  static defaultIpp = 20;

  constructor({ page: page = 0, sort: sort = 'asc', ipp: ipp = Pagination.defaultIpp } = {}) {
    this.page    = page;
    this.sort    = sort;
    this.ipp     = ipp;
  }

  from() {
    return (this.page - 1) * this.ipp;
  }

  to() {
    return (this.page * this.ipp) - 1;
  }

  prev() {
    this.page--;
    return this;
  }

  next() {
    console.log('CALLING NEXT');
    this.page++;
    return this;
  }
}
