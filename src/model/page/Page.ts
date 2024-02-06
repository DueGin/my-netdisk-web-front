export default class Page {
  current: number
  size: number
  // 总数据数量
  total: number
  records: Array<any>

  constructor(current: number, size: number, total: number, records?: Array<any>) {
    this.current = current;
    this.size = size;
    this.total = total;
    this.records = records ? records : [];
  }

}
