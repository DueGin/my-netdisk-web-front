import Page from "@/model/page/Page.ts";
import {UnwrapNestedRefs} from "vue";

export default class Pagination {
  current: number
  size: number
  total: number

  constructor(current?: number, size?: number, total?: number) {
    this.current = current ? current : 1;
    this.size = size ? size : 10;
    this.total = total ? total : 0;
  }

  static setByPage(page: Page, pagination: UnwrapNestedRefs<Pagination>) {
    pagination.size = page.size;
    pagination.current = page.current;
    pagination.total = page.total;
  }
}
