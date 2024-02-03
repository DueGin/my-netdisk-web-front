export default class Page {
  pageNumber: number
  pageSize: number
  // 总数据数量
  totalRow: number
  // 总页数
  totalPage: number
  records: Array<any>

  constructor(pageNumber: number, pageSize: number, totalRow: number, totalPage: number, records?: Array<any>) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalRow = totalRow;
    this.totalPage = totalPage;
    this.records = records ? records : [];
  }

}
