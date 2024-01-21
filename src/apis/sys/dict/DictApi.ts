import Request from "@/utils/request/request.ts";
import Page from "@/model/result/Page.ts";

export function getDictTypePage(params: any): Promise<Result<Page>> {
  return Request.get('/sysDictType/page', {
    params: params
  });
}
