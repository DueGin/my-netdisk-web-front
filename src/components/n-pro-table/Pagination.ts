export default class Pagination {
  pageNumber: number
  pageSize: number
  totalRow: number

  constructor(pageNumber?: number, pageSize?: number, totalRow?: number) {
    this.pageNumber = pageNumber ? pageNumber : 1;
    this.pageSize = pageSize ? pageSize : 10;
    this.totalRow = totalRow ? totalRow : 0;
  }
}
