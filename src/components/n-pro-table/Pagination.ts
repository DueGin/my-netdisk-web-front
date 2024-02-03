import Page from "@/model/page/Page.ts";
import { UnwrapNestedRefs} from "vue";

export default class Pagination {
  pageNumber: number
  pageSize: number
  totalRow: number

  constructor(pageNumber?: number, pageSize?: number, totalRow?: number) {
    this.pageNumber = pageNumber ? pageNumber : 1;
    this.pageSize = pageSize ? pageSize : 10;
    this.totalRow = totalRow ? totalRow : 0;
  }

  static setByPage(page: Page, pagination: UnwrapNestedRefs<Pagination>) {
    pagination.pageSize = page.pageSize;
    pagination.pageNumber = page.pageNumber;
    pagination.totalRow = page.totalRow;
  }
}
