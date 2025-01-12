

export class Pagination {
  page: number;
  ipp:  number;
  sort: string;

  constructor(page: number = 0, sort: string = 'asc', ipp: number = 10) {
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
